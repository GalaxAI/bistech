package controllers

import play.api.mvc._
import javax.inject._
import play.api.libs.json._
import models.Product
import scala.collection.mutable

@Singleton
class ProductsController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // In-memory storage
    private val products = mutable.ListBuffer[Product](
        Product(1, "Laptop", 1000.0),
        Product(2, "GPU", 2000.0),
        Product(3, "Keyboard", 150.0)
    )

    implicit val productFormat: OFormat[Product] = Json.format[Product]

    // GET /products
    def index = Action { Ok(Json.toJson(products.toList)) }

    // GET /products/:id
    def show(id: Int) = Action {
        products.find(_.id == id) match {
            case Some(product) => Ok(Json.toJson(product))
            case None          => NotFound(Json.obj("error" -> "Product not found"))
        }
    }

    // POST /products
    def create = Action(parse.json) { (request: Request[JsValue]) =>
        request.body.validate[Product].fold(
            errors => {
                BadRequest(Json.obj("error" -> "Invalid JSON")).withHeaders("Content-Type" -> "application/json")
            },
                product => {
                val newId = products.map(_.id).max + 1
                val newProduct = product.copy(id = newId)
                products += newProduct
                Created(Json.toJson(newProduct)).withHeaders("Location" -> s"/products/$newId")
            }
        )
    }

    // PUT /products/:id
    def update(id: Int) = Action(parse.json) { (request: Request[JsValue]) =>
        request.body.validate[Product].fold(
            errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
            updatedProduct => {
                val index = products.indexWhere(_.id == id)
                if (index != -1) {
                    products.update(index, updatedProduct.copy(id = id))
                    Ok(Json.toJson(products(index)))
                } else {
                    NotFound(Json.obj("error" -> "Product not found"))
                }
            }
        )
    }

    // DELETE /products/:id
    def delete(id: Int) = Action {
        val index = products.indexWhere(_.id == id)
            if (index != -1) {
                products.remove(index)
                NoContent
            } else {
                NotFound(Json.obj("error" -> "Product not found"))
            }
        }
    }