package controllers

import play.api.mvc._
import javax.inject._
import play.api.libs.json._
import models.Product
import scala.collection.mutable

class ProductsController @Inject()(cc: ControllerComponents) extends AbstractController(cc){

    // In-memory storage
    private val products = mutable.ListBuffer[Product](
        Product(1, "Laptop", 1000.0),
        Product(2, "GPU", 2000.0),
        Product(3, "Keyboard", 150.0)
    )

    implicit val productFormat: OFormat[Product] = Json.format[Product]
    // GET
    def index = Action {Ok(Json.toJson(products.toList))}
    // POST

    // PUT

    // DEL
}