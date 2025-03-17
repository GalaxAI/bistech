import org.jetbrains.kotlin.gradle.dsl.JvmTarget // <-- Add this import
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "2.1.10"
    application
}

group = "com.discord.bot"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // Kotlin standard library
    implementation(kotlin("stdlib"))
    
    // Kord - Discord API wrapper for Kotlin
    implementation("dev.kord:kord-core:0.15.0")
    
    // Dotenv for loading environment variables
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
    
    // Ktor dependencies
    implementation("io.ktor:ktor-server-core:2.3.1")
    implementation("io.ktor:ktor-server-netty:2.3.1")
    implementation("io.ktor:ktor-client-core:2.3.1")
    implementation("io.ktor:ktor-client-cio:2.3.1")
    
    // Logging
    implementation("ch.qos.logback:logback-classic:1.4.7")
}

application {
    mainClass.set("MainKt")
}

tasks.withType<KotlinCompile> {
    compilerOptions.jvmTarget.set(JvmTarget.JVM_17) // Use enum constant
}
