import com.diffplug.gradle.spotless.SpotlessExtension

/**
 * An example of how to integrate style.gradle.kts into your project. You will likely need to change the "dir" and
 * "include" values in the SpotlessExtension configuration
 */
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
                            "dir" to "$projectDir",
                            "include" to listOf("**/*.java")
                    )
            )
        )
    }
}
