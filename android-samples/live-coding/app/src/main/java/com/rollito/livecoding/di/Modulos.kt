package com.rollito.livecoding.di

import com.rollito.livecoding.BuildConfig
import com.rollito.livecoding.data.TareasRepository
import com.rollito.livecoding.data.TareasRepositoryRed
import com.rollito.livecoding.data.remote.TareasApi
import dagger.Binds
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import java.util.concurrent.TimeUnit
import javax.inject.Singleton
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory

@Module
@InstallIn(SingletonComponent::class)
object RedModule {

    // Un solo cliente para toda la app: comparte el pool de conexiones y el caché.
    @Provides @Singleton
    fun okHttp(): OkHttpClient = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .apply {
            if (BuildConfig.DEBUG) {
                addInterceptor(HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BODY })
            }
        }
        .build()

    // ignoreUnknownKeys: si el backend agrega campos, la app no se rompe.
    @Provides @Singleton
    fun json(): Json = Json { ignoreUnknownKeys = true }

    @Provides @Singleton
    fun api(cliente: OkHttpClient, json: Json): TareasApi = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .client(cliente)
        .addConverterFactory(json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(TareasApi::class.java)
}

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositorioModule {
    // @Binds: "cuando pidan la interfaz, dales esta implementación". Sin cuerpo, más barato que @Provides.
    @Binds @Singleton
    abstract fun repositorio(impl: TareasRepositoryRed): TareasRepository
}
