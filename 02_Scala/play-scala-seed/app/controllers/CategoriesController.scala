package controllers

import play.api.mvc._
import javax.inject._
import play.api.libs.json._
import models.Category // You need to create a Category model
import scala.collection.mutable

@Singleton
class CategoriesController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // In-memory storage
  private val categories = mutable.ListBuffer[Category](
    Category(1, "Electronics"),
    Category(2, "Books")
  )

  implicit val categoryFormat: OFormat[Category] = Json.format[Category]

  // GET /categories
  def index = Action { Ok(Json.toJson(categories.toList)) }

  // GET /categories/:id
  def show(id: Int) = Action {
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None          => NotFound(Json.obj("error" -> "Category not found"))
    }
  }

  // POST /categories
  def create = Action(parse.json) { (request: Request[JsValue]) =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      category => {
        val newId = categories.map(_.id).max + 1
        val newCategory = category.copy(id = newId)
        categories += newCategory
        Created(Json.toJson(newCategory)).withHeaders("Location" -> s"/categories/$newId")
      }
    )
  }

  // PUT /categories/:id
  def update(id: Int) = Action(parse.json) { (request: Request[JsValue]) =>
    request.body.validate[Category].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      updatedCategory => {
        val index = categories.indexWhere(_.id == id)
        if (index != -1) {
          categories.update(index, updatedCategory.copy(id = id))
          Ok(Json.toJson(categories(index)))
        } else {
          NotFound(Json.obj("error" -> "Category not found"))
        }
      }
    )
  }

  // DELETE /categories/:id
  def delete(id: Int) = Action {
    val index = categories.indexWhere(_.id == id)
    if (index != -1) {
      categories.remove(index)
      NoContent
    } else {
      NotFound(Json.obj("error" -> "Category not found"))
    }
  }
}