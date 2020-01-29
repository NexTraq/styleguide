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
    configFile = rootProject.file("$projectDir/gradle/nextraq_checkstyle.xml")
}

configure<SpotlessExtension> {
    java {
        eclipse().configFile("$projectDir/gradle/eclipse-java-nextraq-style.xml")
        endWithNewline()
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
    tasks.withType(SpotlessTask::class) {
        enabled = false
    }
}

fun getChangedFiles(): List<File> {
    val sourceBranchProp: String? by project
    val targetBranchProp: String? by project
    val sourceBranch: String? = if (sourceBranchProp.isNullOrEmpty()) "" else sourceBranchProp
    val targetBranch: String? = if (targetBranchProp.isNullOrEmpty()) "master" else targetBranchProp

    return "git diff --name-status --diff-filter=dr $targetBranch $sourceBranch"
            .trim().runCommand().trim().split("\n")
            .filter { it.isNotEmpty() }
            .map { filename ->
                println("Filename: $filename")
                val scrubbedPath: String = """\w\s+(.+)""".toRegex().find(filename)?.groupValues?.get(1)!!
                file("$projectDir${File.separator}$scrubbedPath")
            }.toList()
}

fun String.runCommand(): String {
    val proc: Process = ProcessBuilder(*this.split(" ").toTypedArray())
            .directory(projectDir)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE)
            .start()

    proc.waitFor(1, TimeUnit.MINUTES)
    return proc.inputStream.bufferedReader().readText()
}
