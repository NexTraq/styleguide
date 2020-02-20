import com.diffplug.gradle.spotless.SpotlessExtension
import com.diffplug.gradle.spotless.SpotlessPlugin
import com.diffplug.gradle.spotless.SpotlessTask

// Must use legacy plugin syntax for importing external files to build.gradle
buildscript {
    repositories {
        maven(url = "https://plugins.gradle.org/m2/")
    }
    dependencies {
        classpath("com.diffplug.spotless:spotless-plugin-gradle:3.27.1")
    }
}

apply(plugin = "checkstyle")
apply(plugin =  "java")
apply<SpotlessPlugin>()

configure<CheckstyleExtension> {
    toolVersion = "8.28"
    configFile = rootProject.file("$projectDir/linterconfigs/java/nextraq_checkstyle.xml")
}

// This task checks all sources. It does not respect sourceSet boundaries like other Checkstyle tasks do.
tasks {
    register<Checkstyle>("checkstyleChanged") {
        source(projectDir.absolutePath)
        classpath = files()
        include(*(getChangedFiles().map { it.toRelativeString(file(".")) }.toTypedArray()))
    }
}

configure<SpotlessExtension> {
    isEnforceCheck = false
    java {
        eclipse().configFile("$projectDir/ideconfigs/eclipse-java-nextraq-style.xml")
        endWithNewline()
    }
}

// Configure Spotless to lint only changed files, unless parameters specify otherwise
tasks.withType<SpotlessTask> {
    doFirst {
        val spotlessAll: String? by project
        if (spotlessAll.isNullOrEmpty() || spotlessAll?.toBoolean() == false) {
            filePatterns = getChangedFiles().map { it.absoluteFile }.joinToString(",")
        }
    }
}

// Checkstyle felt the need to add itself to the java plugin's build process without asking. How rude.
if (gradle.startParameter.taskNames
        .intersect(
                listOf("check",
                        *tasks.filter { it.dependsOn.contains("check") }.map { it.name }.toTypedArray()))
                .isNotEmpty()) {
    tasks.withType(Checkstyle::class) {
        enabled = false
    }
}

/**
 * Determines which files have been changed in git between the source branch and the target branch specified in the
 * properties. If no target branch is specified, master is used. If no source branch is specified, nothing is used.
 * The latter will result in the current working copy being compared to the target branch. Note that, unless "origin/"
 * is specified, this function will compare local copies.
 *
 * @return File objects for each changed file
 */
fun getChangedFiles(): List<File> {
    // These params are specified in gradle.properties. If you want to use a source branch other than the working copy
    // or a target branch other than 'origin/master', specify them there.
    val sourceBranchProp: String? by project
    val targetBranchProp: String? by project
    val sourceBranch: String? = if (sourceBranchProp.isNullOrEmpty()) "" else sourceBranchProp
    val targetBranch: String? = if (targetBranchProp.isNullOrEmpty()) "origin/master" else targetBranchProp

    return "git diff --name-status --diff-filter=dr $targetBranch $sourceBranch"
            .trim().runCommand().trim().split("\n")
            .filter { it.isNotEmpty() }
            .map { filename ->
                val scrubbedPath: String = """\w\s+(.+)""".toRegex().find(filename)?.groupValues?.get(1)!!
                file("$projectDir${File.separator}$scrubbedPath")
            }.toList()
}

/**
 * Runs a String as a native command. Used here for git.
 *
 * @throws IllegalStateException if the process returns in error
 * @return The standard output of the command as a String
 */
fun String.runCommand(): String {
    val proc: Process = ProcessBuilder(*this.split(" ").toTypedArray())
            .directory(projectDir)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .start()

    proc.waitFor(1, TimeUnit.MINUTES)
    if (proc.exitValue() != 0) {
        throw IllegalStateException("git diff command failed:\n ${proc.errorStream.bufferedReader().readText()}")
    }
    return proc.inputStream.bufferedReader().readText()
}
