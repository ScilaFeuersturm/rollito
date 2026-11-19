plugins {
    alias(libs.plugins.android.application) apply false
    // AGP 9 trae Kotlin integrado; declarar el plugin acá fija qué versión de Kotlin se usa.
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.hilt) apply false
}
