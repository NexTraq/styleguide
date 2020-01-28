import com.diffplug.gradle.spotless.SpotlessExtension

buildscript {
    repositories {
        maven(url = "https://plugins.gradle.org/m2/")
    }
    dependencies {
        classpath("com.diffplug.spotless:spotless-plugin-gradle:3.27.1")
    }
}

apply(from = "$projectDir/gradle/style.gradle.kts")

configure<SpotlessExtension> {
    java {
        target(
            fileTree(
                    mapOf(
                            "dir" to ".",
                            "include" to listOf("src/**/*.java")
                    )
            )
        )
    }
}
