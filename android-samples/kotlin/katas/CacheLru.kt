package katas.cachelru

class CacheLru<K, V>(private val capacidad: Int) {
    // accessOrder = true: cada lectura mueve la entrada al final (la más reciente).
    private val mapa = object : LinkedHashMap<K, V>(capacidad, 0.75f, true) {
        override fun removeEldestEntry(eldest: MutableMap.MutableEntry<K, V>?) = size > capacidad
    }

    fun get(clave: K): V? = mapa[clave]

    fun put(clave: K, valor: V) {
        mapa[clave] = valor
    }

    override fun toString() = mapa.keys.toString()
}

fun main() {
    val cache = CacheLru<String, Int>(capacidad = 2)
    cache.put("a", 1)
    cache.put("b", 2)
    cache.get("a")
    cache.put("c", 3)
    println(cache)
}
