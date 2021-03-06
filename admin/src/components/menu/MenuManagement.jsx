import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import { PageHeader, Button, Modal, notification, Space } from 'antd'
import { SaveOutlined, SettingOutlined } from '@ant-design/icons'

import * as menuActions from '../../store/actions/menu'
import menuSelectors from '../../store/selectors/menu'

import CategoriesEditorCard from './cards/CategoriesEditorCard'
import DishesEditorCard from './cards/DishesEditorCard'

import './MenuManagement.scss'
import MenuSettingsEditorCard from './cards/MenuSettingsEditorCard'

const MenuManagement = () => {
  const intl = useIntl()
  const dispatch = useDispatch()

  const [isMenuNotSave, setIsMenuNotSave] = useState(false)
  const [isSettingsEditorVisible, setIsSettingsEditorVisible] = useState(false)

  const isMenuLoading = useSelector(menuSelectors.isMenuLoading)
  const isMenuBusy = useSelector(menuSelectors.isMenuBusy)
  const isMenuEqualCache = useSelector(menuSelectors.isMenuEqualCache)
  const menu = useSelector(menuSelectors.menu)

  const handleDiscardMenu = useCallback(() => {
    dispatch(menuActions.discardMenu())
    notification.close('menu-not-save')
  }, [dispatch])

  const handleClickSaveMenu = useCallback(() => {
    dispatch(menuActions.saveMenu())
    notification.close('menu-not-save')
  }, [dispatch])

  useEffect(() => {
    setIsMenuNotSave(menu.id && !isMenuLoading && !isMenuEqualCache)
    if (menu.id && !isMenuLoading && !isMenuEqualCache) {
      notification.warning({
        message: 'Warning',
        description: (
          <div>
            <p>{intl.formatMessage({ id: 'ChangesDiscard' })}</p>
            <Space>
              <Button
                onClick={() => notification.close('menu-not-save')}
                key="cancel-menu-notification"
              >
                {intl.formatMessage({ id: 'Cancel' })}
              </Button>
              <Button
                className="btn btn--warning"
                onClick={handleDiscardMenu}
                key="discard-menu-notification"
              >
                {intl.formatMessage({ id: 'Discard' })}
              </Button>
              <Button type="primary" onClick={handleClickSaveMenu} key="save-menu-notification">
                {intl.formatMessage({ id: 'Save' })}
              </Button>
            </Space>
          </div>
        ),
        placement: 'bottomLeft',
        duration: 0,
        closeIcon: <></>,
        key: 'menu-not-save',
      })
    }
  }, [isMenuLoading, isMenuEqualCache, handleDiscardMenu, menu.id, handleClickSaveMenu, intl])

  const handleClickSettingsMenu = () => {
    setIsSettingsEditorVisible(true)
  }

  const menuTitle = (
    <div className="menu-title">
      <span>
        {isMenuNotSave ? <span style={{ color: '#fa8c16' }}>* </span> : ''}
        {intl.formatMessage({ id: 'Menu' })}
      </span>
      {!isMenuLoading && menu.title ? `: ${menu.title}` : null}
      {isMenuNotSave ? (
        <span style={{ color: '#fa8c16' }}> - {intl.formatMessage({ id: 'notSaved' })}</span>
      ) : null}
    </div>
  )

  return (
    <div id="menu-constructor" className="menu-constructor">
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        ghost={false}
        title={menuTitle}
        extra={[
          isMenuNotSave ? (
            <Button className="btn btn--warning" onClick={handleDiscardMenu} key="discard-menu">
              {intl.formatMessage({ id: 'Discard' })}
            </Button>
          ) : null,
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleClickSaveMenu}
            loading={isMenuBusy}
            key="save-menu"
          >
            {intl.formatMessage({ id: 'Save' })}
          </Button>,
          <Button
            type="default"
            icon={<SettingOutlined />}
            onClick={handleClickSettingsMenu}
            key="settings-menu"
          >
            {intl.formatMessage({ id: 'Settings' })}
          </Button>,
        ]}
      />

      <div className="menu-constructor-grid">
        <div className="menu-constructor-col menu-constructor-col--one">
          <CategoriesEditorCard />
        </div>
        <div className="menu-constructor-col menu-constructor-col--second">
          <DishesEditorCard />
        </div>
      </div>

      <Modal
        title={intl.formatMessage({ id: 'Settings' })}
        visible={isSettingsEditorVisible}
        width={720}
        footer={null}
        closable={false}
        destroyOnClose
      >
        <MenuSettingsEditorCard
          onCancel={() => setIsSettingsEditorVisible(false)}
          onSave={() => setIsSettingsEditorVisible(false)}
        />
      </Modal>
    </div>
  )
}

export default MenuManagement
