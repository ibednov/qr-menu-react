import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

import { Button, Space, Form, Input, Switch, Select } from 'antd'

import * as menuActions from '../../../store/actions/menu'
import menuSelectors from '../../../store/selectors/menu'

import './DishEditorCard.scss'

const dishSchema = () => ({
  categoryId: null,
  title: 'New dish',
  internalId: '',
  description: '',
  photo: null,
  isPublished: true,
  isEnabledToOrder: true,
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
    if (editDish) dishEditorForm.setFieldsValue(editDish)
  }, [dishEditorForm, editDish])

  useEffect(() => {
    dishEditorForm.setFieldsValue({ categoryId: selectedCategoryId })
  }, [dishEditorForm, selectedCategoryId])

  const handleClickCancel = () => {
    setTimeout(() => dishEditorForm.resetFields(), 100)
    onAction('dish:editor.cancel')
  }

  const handleClickSave = (values) => {
    if (editDish) dispatch(menuActions.updateDish(selectedCategoryId, editDish.id, values))
    else
      dispatch(menuActions.addDish(selectedCategoryId, { ...dishSchema(), ...values, id: uuid() }))

    setTimeout(() => dishEditorForm.resetFields(), 100)
    onAction('dish:editor.save')
  }

  return (
    <div className="dish-editor">
      <Form
        className="dish-editor-form"
        form={dishEditorForm}
        layout="vertical"
        initialValues={dishSchema()}
        onFinish={handleClickSave}
      >
        <Form.Item name="isPublished" label="Published" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="isEnabledToOrder" label="Enabled To Order" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Category">
          <Select>
            {menuCategories.map((category) => (
              <Select.Option value={category.id} key={category.id}>
                {category.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
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
