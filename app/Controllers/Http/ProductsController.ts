import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  public async index({ctx}: HttpContextContract) {
    return {
      message:"Get All Products"
    }
  }

  public async store({request,response}: HttpContextContract) {
    response.status(201)
    return {
      message:"Product created",
      body:request.body()
    }
  }

  public async show({params}: HttpContextContract) {
    return {
      message:"Get One Product " + params.id
    }
  }

  public async update({params}: HttpContextContract) {
    return {
      message:"Update One Product " + params.id
    }
  }

  public async destroy({params}: HttpContextContract) {
    return {
      message:"De;ete One Product " + params.id
    }
  }
}
