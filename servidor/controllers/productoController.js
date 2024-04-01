const Producto = require('../models/Producto')

exports.crearProducto = async (req, res) => {
  try {
    let producto
    // Creamos nuestro producto
    // eslint-disable-next-line prefer-const
    producto = new Producto(req.body)
    await producto.save()
    res.send(producto)
    console.log(producto)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
    res.json(productos)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

exports.actualizarProducto = async (req, res) => {
  try {
    // destroctoring (?)
    const { nombre, categoria, ubicacion, precio } = req.body
    // accedemos al id del producto
    let producto = await Producto.findById(req.params.id)
    if (!producto) {
      res.status(404).json({ msg: 'No existe el producto' })
    }

    producto.nombre = nombre
    producto.categoria = categoria
    producto.ubicacion = ubicacion
    producto.precio = precio

    producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true })
    res.json(producto)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
    if (!producto) {
      res.status(404).json({ msg: 'No existe el producto' })
    }

    res.json(producto)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}

exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
      res.status(404).json({ msg: 'No existe el producto' })
    }
    await Producto.findOneAndDelete({ _id: req.params.id })
    res.json({ msg: 'Producto eliminado con éxito!' })
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  }
}
