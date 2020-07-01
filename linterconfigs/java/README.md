# Java

## Tooling

There are two separate linting programs to handle checks and formatting for java. Java style checks will use
[Checkstyle](https://github.com/checkstyle/checkstyle), while formatting will be handled by
[Spotless](https://github.com/diffplug/spotless). This is the program that will perform lint checks in the CI process.
Spotless also has "check" functionality, but it is a subset of that found in Checkstyle.

## Checkstyle

### Gradle

To run locally with Gradle, checking only changed files, run the ```checkstyleChanged``` task:

```bash
./gradlew :checkstyleChanged
```

To check all java files, run the ```checkstyleMain``` task:

```bash
./gradlew :checkstyleMain
```

NOTE: There is currently an issue where ```checkstyleMain``` and ```checkstyleTest``` behave identically, checking *all*
files, instead of just main/test, respectively. There is a [JIRA ticket](https://nextraq.atlassian.net/browse/INFRA-42)
to fix this.

### CLI

To run checkstyle outside the context of Gradle, install the command with your favorite package manager and use the
following command:

```bash
checkstyle -c nextraq_checkstyle.xml <files to check>
```

## Spotless

Spotless uses Eclipse formatting functionality, configured with
[eclipse-java-nextraq-style.xml](../../ideconfigs/eclipse-java-nextraq-style.xml). To use Spotless, import this repo
into your project (TODO: Update with instructions once cross-repo solution is decided upon) and apply
```spotless.gradle``` in your ```build.gradle``` (or a subproject gradle file), following the example in
```example.build.gradle```.

To format files using Spotless, use the following command:

```bash
./gradlew spotlessApply
```

You can also check files with Spotless using the following command:

```bash
./gradlew spotlessCheck
```

NOTE: Spotless does not have its own CLI interface and must be integrated with a build system

### Cases Not Handled By Formatter

Spotless will not remove extraneous newlines before closing brace of a block.
