import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Image, Dropdown, Button, Menu } from 'antd'
import {
  EllipsisOutlined,
  VerticalAlignMiddleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons'

import * as menuActions from '../../../store/actions/menu'
import menuSelectors from '../../../store/selectors/menu'

import { SERVER_URL } from '../../../config'
import translate from '../../../intl/translate'
import './CategoryItem.scss'

const CategoryItem = ({ category, onAction }) => {
  const dispatch = useDispatch()
  const selectedCategoryId = useSelector(menuSelectors.selectedCategoryId)

  const handleClickCategory = () => {
    dispatch(menuActions.setSelectedCategoryId(category.id))
  }

  const handleClickEditCategory = (event) => {
    onAction('category:edit', category)

    event.domEvent.stopPropagation()
  }

  const handleClickDeleteCategory = (event) => {
    dispatch(menuActions.deleteCategory(category.id))

    event.domEvent.stopPropagation()
  }

  return (
    <div
      className={`category-item ${!category.isVisible ? 'unvisible' : ''}${
        category.id === selectedCategoryId ? 'selected' : ''
      }`}
      onClick={handleClickCategory}
      onKeyDown={handleClickCategory}
      role="button"
      tabIndex="0"
    >
      <div className="category-item__photo">
        <Image
          width={60}
          height={60}
          src={
            category.photo
              ? `${SERVER_URL}/uploads/${category.photo.userId}/thumbnail/${category.photo.sizes.thumbnail}`
              : 'https://via.placeholder.com/300?text=QR Menu'
          }
          fallback="https://via.placeholder.com/300?text=QR Menu"
          preview={false}
        />
      </div>
      <div className="category-item__content">
        <div className="category-item__title">{category.title}</div>
        <div className="category-item__meta">
          {category.dishes.length} {translate('items')}
        </div>
      </div>
      <div className="category-item__visible">
        {category.isVisible ? (
          <EyeOutlined style={{ color: '#1890ff' }} />
        ) : (
          <EyeInvisibleOutlined style={{ color: '#ffa940' }} />
        )}
      </div>
      <div className="category-item__actions">
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu style={{ minWidth: '100px' }}>
              <Menu.Item onClick={handleClickEditCategory}>{translate('Edit')}</Menu.Item>

              <Menu.Item onClick={handleClickDeleteCategory} danger>
                {translate('Delete')}
              </Menu.Item>
            </Menu>
          }
          arrow
        >
          <Button onClick={(event) => event.stopPropagation()} icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
      <div className="category-item__move move">
        <VerticalAlignMiddleOutlined />
      </div>
    </div>
  )
}

CategoryItem.defaultProps = {
  onAction: () => {},
}

CategoryItem.propTypes = {
  category: PropTypes.instanceOf(Object).isRequired,
  onAction: PropTypes.func,
}

export default CategoryItem
