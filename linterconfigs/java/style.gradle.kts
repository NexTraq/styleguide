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
