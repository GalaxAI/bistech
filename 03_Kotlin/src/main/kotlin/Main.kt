// No package declaration needed for the default package

import dev.kord.core.*
import dev.kord.core.entity.Message
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.github.cdimascio.dotenv.Dotenv
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking

data class Product(val name: String, val description: String, val price: Double)

class ProductRepository {
    private val categories = mapOf(
        "electronics" to listOf(
            Product("Smartphone", "Latest model smartphone", 799.99),
            Product("Laptop", "High-performance laptop", 1299.99),
            Product("Headphones", "Noise-cancelling wireless headphones", 199.99)
        ),
        "clothing" to listOf(
            Product("T-Shirt", "Cotton t-shirt", 19.99),
            Product("Jeans", "Blue denim jeans", 49.99),
            Product("Jacket", "Winter jacket", 89.99)
        ),
        "books" to listOf(
            Product("Novel", "Bestselling fiction novel", 14.99),
            Product("Cookbook", "Gourmet recipes", 24.99),
            Product("Technical Book", "Programming guide", 39.99)
        ),
        "home" to listOf(
            Product("Sofa", "Comfortable 3-seater sofa", 499.99),
            Product("Lamp", "Modern design lamp", 79.99),
            Product("Coffee Table", "Wooden coffee table", 149.99)
        )
    )

    fun getCategories(): List<String> {
        return categories.keys.toList()
    }

    fun getProductsByCategory(category: String): List<Product>? {
        return categories[category.lowercase()]
    }
}

suspend fun main() {
    // Load environment variables from .env file
    val dotenv = Dotenv.load()
    val token = dotenv.get("DISCORD_BOT_TOKEN")
    
    if (token.isNullOrEmpty()) {
        println("ERROR: DISCORD_BOT_TOKEN is not set in the .env file")
        return
    }
    
    println("Starting Discord bot...")
    
    val productRepository = ProductRepository()

    // Create Kord client
    val kord = Kord(token)

    kord.on<MessageCreateEvent> {
        // Ignore messages from bots (including itself)
        if (message.author?.isBot != false) return@on
        
        val content = message.content.lowercase()
        
        when {
            content == "!help" -> {
                message.channel.createMessage("""
                    |**Available Commands:**
                    |`!categories` - List all product categories
                    |`!products <category>` - List products in a specific category
                    |`!help` - Show this help message
                """.trimMargin())
            }
            
            content == "!categories" -> {
                val categories = productRepository.getCategories()
                val response = buildString {
                    append("**Available Categories:**\n")
                    categories.forEach { append("- $it\n") }
                    append("\nUse `!products <category>` to see products in a specific category")
                }
                message.channel.createMessage(response)
            }
            
            content.startsWith("!products ") -> {
                val category = content.removePrefix("!products ").trim()
                val products = productRepository.getProductsByCategory(category)
                
                if (products == null) {
                    message.channel.createMessage("Category '$category' not found. Use `!categories` to see available categories.")
                } else {
                    val response = buildString {
                        append("**Products in $category:**\n")
                        products.forEach {
                            append("- **${it.name}** - ${it.description} - $${it.price}\n")
                        }
                    }
                    message.channel.createMessage(response)
                }
            }
        }
    }

    println("Bot is ready! Add it to your Discord server and try the commands.")
    
    kord.login {
        // We need to specify MessageContent intent to receive message content
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
        
        // Configure presence status and activity
        presence {
            playing("!help for commands")
        }
    }
}