import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import StoreProductValidator from 'App/Validators/StoreProductValidator'

export default class ProductsController {
  public async index({ctx}: HttpContextContract) {
    const products = await Product.all()
    return {
      data:products
    }
  }

  public async store({request,response}: HttpContextContract) {
    const payload = await request.validate(StoreProductValidator)
    response.status(201)
    const product = await Product.create(payload)
    // ToDo : File Upload
    return {
      message:"Product created",
      data:product
    }
  }

  public async show({params,response}: HttpContextContract) {

    try {
    const product = await Product.findOrFail(params.id)
    response.status(200)
    return {
      data:product
    }
  } catch (error) {
    response.status(404)
   return {
    error:"Product with given ID not found"
   }
  }

  }

  public async update({request,params,response}: HttpContextContract) {
    const payload = await request.validate(StoreProductValidator)
    try {

      const product = await Product.findOrFail(params.id)
      product.name = payload.name
      product.price = payload.price
      product.description = payload.description
      product.category_id = payload.category_id
      product.save()
      response.status(200)
      // ToDo : File Upload
      return {
        message:"Product updated",
        data:product
      }
    } catch (error) {
      response.status(404)
     return {
      error:"Product with given ID not found"
     }
    }

    }

  public async destroy({params,response}: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)
      product.delete();
      response.status(200)
      // ToDo : File Delete
      return {
        message:"Product deleted"
      }
    } catch (error) {
      response.status(404)
     return {
      error:"Product with given ID not found"
     }
    }
  }
}
