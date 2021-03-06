const { Schema, Types, model } = require('mongoose')

const photoSchema = new Schema({
  userId: { type: Types.ObjectId },
  sizes: { type: Object },
})

const dishSchema = new Schema({
  title: { type: String },
  photo: { type: photoSchema, default: null },
  description: { type: String },
  isPublished: { type: Boolean },
  isEnabledToOrder: { type: Boolean },
  priceValue: { type: Number, default: null },
  ingredients: [String],
  allergens: [{ type: new Schema({ number: Number, label: String }), default: [] }],
  tags: [{ type: new Schema({ id: Number, icon: String, label: String }), default: [] }],
})

const orderPosition = new Schema({
  item: { type: dishSchema, default: null },
  quantity: { type: Number },
})

const ordersSchema = new Schema(
  {
    orderNumber: { type: Number },
    userId: { type: Types.ObjectId, ref: 'User' },
    tableNumber: { type: String },
    items: [{ type: orderPosition }],
    status: { type: String, default: 'NEW' },
    totalPrice: { type: Number },
    comment: { type: String },
    currency: { type: String },
    orderDate: { type: String },
  },
  {
    timestamps: true,
  },
)

ordersSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString()
})

ordersSchema.set('toJSON', { virtuals: true })

const Orders = model('Orders', ordersSchema)

module.exports = Orders
