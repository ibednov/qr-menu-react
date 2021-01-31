import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { Button, Space, Form, Input, Switch, Select, InputNumber } from 'antd'

import ImagesManagement from '../../images/ImagesManagement'

import * as menuActions from '../../../store/actions/menu'
import menuSelectors from '../../../store/selectors/menu'

import { INGREDIENTS, TAGS } from '../../../default/menus.default'

import './DishEditorCard.scss'

const dishSchema = () => ({
  categoryId: null,
  title: 'New dish',
  internalId: '',
  description: '',
  photo: null,
  isPublished: true,
  isEnabledToOrder: true,
  priceValue: null,
  tags: [],
  ingredients: [],
  allergens: [],
})

const DishEditorCard = ({ editDish, onAction }) => {
  const dispatch = useDispatch()

  const [dishEditorForm] = Form.useForm()

  const menuCategories = useSelector(menuSelectors.menuCategories)
  const selectedCategoryId = useSelector(menuSelectors.selectedCategoryId)

  useEffect(() => {
    if (editDish) {
      const tags = editDish.tags.map((tag) => tag.id)
      dishEditorForm.setFieldsValue({ ...editDish, tags })
    }
  }, [dishEditorForm, editDish])

  useEffect(() => {
    dishEditorForm.setFieldsValue({ categoryId: selectedCategoryId })
  }, [dishEditorForm, selectedCategoryId])

  const handleClickCancel = () => {
    setTimeout(() => dishEditorForm.resetFields(), 100)
    onAction('dish:editor.cancel')
  }

  const handleClickSave = ({ categoryId, ...dish }) => {
    const isEdit = !!editDish

    const tags = dish.tags.reduce(
      (acc, tagId) => [...acc, TAGS.find((tag) => tag.id === tagId)],
      [],
    )

    switch (true) {
      // Edit & Change CategoryId
      case isEdit && selectedCategoryId !== categoryId:
        dispatch(menuActions.deleteDish(selectedCategoryId, editDish.id))
        dispatch(menuActions.addDish(categoryId, { ...dish, tags }))
        break
      // Edit & NOT Change CategoryId
      case isEdit && selectedCategoryId === categoryId:
        dispatch(menuActions.updateDish(selectedCategoryId, editDish.id, { ...dish, tags }))
        break
      // NOT Edit
      case !isEdit:
        dispatch(
          menuActions.addDish(categoryId, {
            ...dishSchema(),
            ...dish,
            tags,
            id: uuid(),
          }),
        )
        break
      default:
        break
    }

    setTimeout(() => dishEditorForm.resetFields(), 100)
    onAction('dish:editor.save')
  }

  return (
    <div className="dish-editor">
      <Form
        className="dish-editor-form"
        form={dishEditorForm}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={dishSchema()}
        onFinish={handleClickSave}
      >
        <Form.Item name="photo" label="Photo">
          <ImagesManagement previewSettings={{ width: 104, height: 104 }} />
        </Form.Item>
        <Form.Item className="mb-0" name="isPublished" label="Published" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="isEnabledToOrder" label="Enabled To Order" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Select>
            {menuCategories.map((category) => (
              <Select.Option value={category.id} key={category.id}>
                {category.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Internal ID" name="internalId">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Price" name="priceValue">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Ingredients" name="ingredients">
          <Select mode="tags" options={INGREDIENTS} />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select className="tags-list" mode="multiple">
            {TAGS.map((tag) => (
              <Select.Option className="tags-item" value={tag.id} key={tag.id}>
                <div className="tags-item-content">
                  <span>{tag.label}</span>
                  <span>{tag.icon}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="mb-0" wrapperCol={{ span: 24 }}>
          <div className="dish-editor-form__actions">
            <Space>
              <Button onClick={handleClickCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

DishEditorCard.defaultProps = {
  editDish: null,
  onAction: () => {},
}

DishEditorCard.propTypes = {
  editDish: PropTypes.instanceOf(Object),
  onAction: PropTypes.func,
}

export default DishEditorCard
