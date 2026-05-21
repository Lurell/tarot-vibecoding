import { useState } from 'react';
import { useSettingsStore } from '@/store/settings-store';
import { Button } from '@/components/ui/Button';

export function SettingsPage() {
  const { deepseekApiKey, deepseekModel, setApiKey, setModel, clearApiKey } = useSettingsStore();
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="max-w-lg mx-auto space-y-8 py-8">
      <h1 className="text-2xl font-display font-bold text-mystic-text">设置</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-mystic-text">AI 解读配置</h2>
        <p className="text-sm text-mystic-muted">
          配置 DeepSeek API 密钥以启用 AI 深度解读。您的密钥仅存储在浏览器本地，不会上传到任何服务器。
        </p>

        <div className="space-y-2">
          <label className="text-sm text-mystic-muted">API 密钥</label>
          <div className="flex gap-2">
            <input
              type={showKey ? 'text' : 'password'}
              value={deepseekApiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="flex-1 rounded-lg bg-mystic-surface border border-mystic-primary/20 px-4 py-2.5 text-mystic-text placeholder:text-mystic-muted/50 focus:outline-none focus:border-mystic-primary focus:ring-1 focus:ring-mystic-primary transition-colors"
            />
            <Button variant="secondary" size="sm" onClick={() => setShowKey(!showKey)}>
              {showKey ? '隐藏' : '显示'}
            </Button>
          </div>
          {deepseekApiKey && (
            <button
              onClick={clearApiKey}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              清除密钥
            </button>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-mystic-muted">模型</label>
          <select
            value={deepseekModel}
            onChange={(e) => setModel(e.target.value)}
            className="w-full rounded-lg bg-mystic-surface border border-mystic-primary/20 px-4 py-2.5 text-mystic-text focus:outline-none focus:border-mystic-primary focus:ring-1 focus:ring-mystic-primary transition-colors"
          >
            <option value="deepseek-chat">deepseek-chat</option>
            <option value="deepseek-reasoner">deepseek-reasoner</option>
          </select>
        </div>
      </div>
    </div>
  );
}
