import React, { useState } from 'react'
import { Button, Card, Input } from '@lemon-design-xx/core'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`表单提交: ${JSON.stringify(formData, null, 2)}`)
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍋 Lemon Design System
          </h1>
          <p className="text-xl text-gray-600">
            基于 TailwindCSS 的现代 React 组件库
          </p>
        </div>

        {/* 按钮展示 */}
        <Card title="按钮组件" className="mb-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">不同变体</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">不同尺寸</h4>
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">状态</h4>
              <div className="flex items-center gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* 表单展示 */}
        <Card title="表单组件" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="姓名"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
              />
              <Input
                label="邮箱"
                type="email"
                placeholder="请输入您的邮箱"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </div>
            
            <Input
              label="消息"
              multiline
              rows={4}
              placeholder="请输入您的消息"
              value={formData.message}
              onChange={handleInputChange('message')}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                取消
              </Button>
              <Button type="submit">
                提交
              </Button>
            </div>
          </form>
        </Card>

        {/* 卡片展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="功能卡片" subtitle="展示各种功能">
            <p className="text-gray-600">
              这是一个功能卡片，可以展示各种信息和操作。
            </p>
            <div className="mt-4">
              <Button size="sm" variant="outline">了解更多</Button>
            </div>
          </Card>

          <Card title="统计卡片" subtitle="数据统计">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">总用户数</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">活跃用户</span>
                <span className="font-semibold">856</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">转化率</span>
                <span className="font-semibold text-green-600">12.5%</span>
              </div>
            </div>
          </Card>

          <Card title="操作卡片" subtitle="快速操作">
            <div className="space-y-3">
              <Button size="sm" className="w-full">创建新项目</Button>
              <Button size="sm" variant="outline" className="w-full">导入数据</Button>
              <Button size="sm" variant="ghost" className="w-full">查看文档</Button>
            </div>
          </Card>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            © 2024 Lemon Design System. 使用 React + TailwindCSS 构建
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
