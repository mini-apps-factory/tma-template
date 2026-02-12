'use client';

import { useState } from 'react';
import { Home, Search, User, Settings, Plus, Star, Bell } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Header } from '@/components/ui/Header';
import { TabBar, type TabItem } from '@/components/ui/TabBar';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Skeleton, SkeletonListItem } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { AnimatedList } from '@/components/ui/AnimatedList';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { PageTransition } from '@/components/layout/PageTransition';
import { useTelegramContext } from '@/components/providers/TelegramProvider';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/utils';

const tabs: TabItem[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'search', label: 'Поиск', icon: Search },
  { id: 'profile', label: 'Профиль', icon: User, badge: 3 },
  { id: 'settings', label: 'Настройки', icon: Settings },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSuccess, setBtnSuccess] = useState(false);
  const { user, isTelegram } = useTelegramContext();
  const toast = useToast();

  const handleAsyncAction = async () => {
    setBtnLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setBtnLoading(false);
    setBtnSuccess(true);
    toast.success('Действие выполнено!');
    setTimeout(() => setBtnSuccess(false), 2000);
  };

  return (
    <AppShell
      header={<Header title="Mini App" subtitle="Template v2.0 — Premium" />}
      tabBar={<TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />}
    >
      <PageTransition>
        <div className="p-4 space-y-4">
          {/* Welcome card with animated number */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-tg-text">
                {isTelegram ? `Привет, ${user?.first_name ?? 'User'}!` : 'Mini App Ready ✨'}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-tg-hint mb-3">Баланс:</p>
              <NumberTicker
                value={125500}
                format={(n) => formatPrice(n)}
                className="text-3xl font-bold text-tg-text"
              />
            </CardContent>
          </Card>

          {/* Buttons — with loading/success states */}
          <Card>
            <CardHeader>
              <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide">Buttons</h3>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Button
                fullWidth
                icon={<Star className="w-4 h-4" />}
                loading={btnLoading}
                success={btnSuccess}
                onClick={handleAsyncAction}
              >
                Async Action → Loading → ✓
              </Button>
              <Button variant="secondary" fullWidth icon={<Plus className="w-4 h-4" />}>Secondary</Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1">Ghost</Button>
                <Button variant="danger" className="flex-1">Danger</Button>
              </div>
            </CardContent>
          </Card>

          {/* Toast demos */}
          <Card>
            <CardHeader>
              <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide">Toast Notifications</h3>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button size="sm" onClick={() => toast.success('Сохранено!')}>✓ Success</Button>
              <Button size="sm" variant="danger" onClick={() => toast.error('Ошибка!')}>✕ Error</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.info('Подсказка')}>ℹ Info</Button>
            </CardContent>
          </Card>

          {/* Input */}
          <Card>
            <CardHeader>
              <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide">Inputs</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Введите текст..." label="Имя" />
              <Input variant="search" placeholder="Поиск услуг..." />
            </CardContent>
          </Card>

          {/* Animated List */}
          <Card padding="none">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide">Animated List</h3>
            </div>
            <AnimatedList staggerDelay={0.08} variant="fadeUp">
              {['Стрижка', 'Маникюр', 'Массаж', 'Окрашивание'].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-tg-secondary-bg/50 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tg-button/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-tg-button" />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-tg-text">{item}</p>
                      <p className="text-[13px] text-tg-hint">60 мин</p>
                    </div>
                  </div>
                  <span className="text-[15px] font-semibold text-tg-text">{formatPrice((i + 1) * 1500)}</span>
                </div>
              ))}
            </AnimatedList>
          </Card>

          {/* Swipeable Cards */}
          <div>
            <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide px-1 mb-2">Swipe Cards ← →</h3>
            <div className="space-y-2">
              {['Запись на 15:00', 'Запись на 17:30'].map((item, i) => (
                <SwipeableCard
                  key={i}
                  onSwipeLeft={() => toast.error(`Удалено: ${item}`)}
                  onSwipeRight={() => toast.success(`Подтверждено: ${item}`)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-[15px] font-medium text-tg-text">{item}</p>
                      <p className="text-[13px] text-tg-hint">Маникюр • Анна</p>
                    </div>
                    <Bell className="w-5 h-5 text-tg-hint" />
                  </div>
                </SwipeableCard>
              ))}
            </div>
          </div>

          {/* Modal trigger */}
          <Card>
            <CardContent>
              <Button fullWidth variant="secondary" onClick={() => setModalOpen(true)}>
                Открыть модалку (свайп ↓ = закрыть)
              </Button>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card padding="none">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-sm font-medium text-tg-section-header uppercase tracking-wide">Skeleton Loading</h3>
            </div>
            <SkeletonListItem />
            <SkeletonListItem />
          </Card>

          {/* EmptyState */}
          <EmptyState
            title="Здесь пока пусто"
            description="Начните добавлять записи к мастерам"
            actionLabel="Записаться"
            onAction={() => toast.info('Бронирование откроется здесь')}
          />
        </div>
      </PageTransition>

      {/* Modal — swipe down to close */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Подтверждение записи">
        <div className="space-y-4">
          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <p className="text-sm text-tg-hint mb-1">Услуга</p>
            <p className="text-base font-semibold text-tg-text">Стрижка + Укладка</p>
          </div>
          <div className="bg-tg-secondary-bg rounded-xl p-4">
            <p className="text-sm text-tg-hint mb-1">Дата и время</p>
            <p className="text-base font-semibold text-tg-text">15 февраля, 15:00</p>
          </div>
          <div className="bg-tg-secondary-bg rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm text-tg-hint">Итого</span>
            <NumberTicker value={3500} format={(n) => formatPrice(n)} className="text-xl font-bold text-tg-text" />
          </div>
          <Button fullWidth onClick={() => { setModalOpen(false); toast.success('Записано!'); }}>
            Подтвердить запись
          </Button>
        </div>
      </Modal>
    </AppShell>
  );
}
