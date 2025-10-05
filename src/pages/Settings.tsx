import { useState } from 'react';
import { usePrefs } from '../store/usePrefs';

const SettingsPage = () => {
  const prefs = usePrefs((state) => state.prefs);
  const update = usePrefs((state) => state.update);
  const [message, setMessage] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await update({
      dailyNew: Number(form.get('dailyNew')),
      dailyReviewCap: Number(form.get('dailyReviewCap')),
      algo: form.get('algo') as 'SM2' | 'LEITNER',
      typingStrict: form.get('typingStrict') === 'on',
      clozeDensity: form.get('clozeDensity') as 'low' | 'mid' | 'high'
    });
    setMessage('设置已保存');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">参数设置</h2>
        <p className="text-sm text-slate-600">调整学习配额、算法与键入策略。</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-1 text-sm">
            <span>每日新词</span>
            <input
              type="number"
              name="dailyNew"
              defaultValue={prefs.dailyNew}
              className="border rounded px-3 py-2"
            />
          </label>
          <label className="space-y-1 text-sm">
            <span>每日复习上限</span>
            <input
              type="number"
              name="dailyReviewCap"
              defaultValue={prefs.dailyReviewCap}
              className="border rounded px-3 py-2"
            />
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-1 text-sm">
            <span>使用算法</span>
            <select name="algo" defaultValue={prefs.algo} className="border rounded px-3 py-2">
              <option value="SM2">SM-2</option>
              <option value="LEITNER">Leitner 盒</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="typingStrict" defaultChecked={prefs.typingStrict} />
            <span>严格拼写（禁用模糊匹配）</span>
          </label>
        </div>
        <label className="space-y-1 text-sm block">
          <span>完形填空挖空密度</span>
          <select name="clozeDensity" defaultValue={prefs.clozeDensity} className="border rounded px-3 py-2">
            <option value="low">低</option>
            <option value="mid">中</option>
            <option value="high">高</option>
          </select>
        </label>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          保存设置
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;
