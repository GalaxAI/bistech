package controllers

import play.api.mvc._
import javax.inject._
import play.api.libs.json._
import models.CartItem // You need to create a CartItem model
import scala.collection.mutable

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // In-memory storage
  private val cartItems = mutable.ListBuffer[CartItem](
    CartItem(1, 1, 2) // Example: Product ID 1, quantity 2
  )

  implicit val cartItemFormat: OFormat[CartItem] = Json.format[CartItem]

  // GET /cart
  def index = Action { Ok(Json.toJson(cartItems.toList)) }

  // GET /cart/:id
  def show(id: Int) = Action {
    cartItems.find(_.id == id) match {
      case Some(item) => Ok(Json.toJson(item))
      case None       => NotFound(Json.obj("error" -> "Cart item not found"))
    }
  }

  // POST /cart
  def create = Action(parse.json) { (request: Request[JsValue]) =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      item => {
        val newId = cartItems.map(_.id).max + 1
        val newItem = item.copy(id = newId)
        cartItems += newItem
        Created(Json.toJson(newItem)).withHeaders("Location" -> s"/cart/$newId")
      }
    )
  }

  // PUT /cart/:id
  def update(id: Int) = Action(parse.json) { (request: Request[JsValue]) =>
    request.body.validate[CartItem].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      updatedItem => {
        val index = cartItems.indexWhere(_.id == id)
        if (index != -1) {
          cartItems.update(index, updatedItem.copy(id = id))
          Ok(Json.toJson(cartItems(index)))
        } else {
          NotFound(Json.obj("error" -> "Cart item not found"))
        }
      }
    )
  }

  // DELETE /cart/:id
  def delete(id: Int) = Action {
    val index = cartItems.indexWhere(_.id == id)
    if (index != -1) {
      cartItems.remove(index)
      NoContent
    } else {
      NotFound(Json.obj("error" -> "Cart item not found"))
    }
  }
}