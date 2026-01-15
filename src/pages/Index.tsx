import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import RussiaMap from '@/components/RussiaMap';

interface Region {
  code: string;
  name: string;
  clicks: number;
}

const RUSSIAN_REGIONS: Region[] = [
  { code: '01', name: 'Республика Адыгея', clicks: 0 },
  { code: '02', name: 'Республика Башкортостан', clicks: 0 },
  { code: '03', name: 'Республика Бурятия', clicks: 0 },
  { code: '04', name: 'Республика Алтай', clicks: 0 },
  { code: '05', name: 'Республика Дагестан', clicks: 0 },
  { code: '06', name: 'Республика Ингушетия', clicks: 0 },
  { code: '07', name: 'Кабардино-Балкарская Республика', clicks: 0 },
  { code: '08', name: 'Республика Калмыкия', clicks: 0 },
  { code: '09', name: 'Карачаево-Черкесская Республика', clicks: 0 },
  { code: '10', name: 'Республика Карелия', clicks: 0 },
  { code: '11', name: 'Республика Коми', clicks: 0 },
  { code: '12', name: 'Республика Марий Эл', clicks: 0 },
  { code: '13', name: 'Республика Мордовия', clicks: 0 },
  { code: '14', name: 'Республика Саха (Якутия)', clicks: 0 },
  { code: '15', name: 'Республика Северная Осетия', clicks: 0 },
  { code: '16', name: 'Республика Татарстан', clicks: 0 },
  { code: '17', name: 'Республика Тыва', clicks: 0 },
  { code: '18', name: 'Удмуртская Республика', clicks: 0 },
  { code: '19', name: 'Республика Хакасия', clicks: 0 },
  { code: '21', name: 'Чувашская Республика', clicks: 0 },
  { code: '22', name: 'Алтайский край', clicks: 0 },
  { code: '23', name: 'Краснодарский край', clicks: 0 },
  { code: '24', name: 'Красноярский край', clicks: 0 },
  { code: '25', name: 'Приморский край', clicks: 0 },
  { code: '26', name: 'Ставропольский край', clicks: 0 },
  { code: '27', name: 'Хабаровский край', clicks: 0 },
  { code: '28', name: 'Амурская область', clicks: 0 },
  { code: '29', name: 'Архангельская область', clicks: 0 },
  { code: '30', name: 'Астраханская область', clicks: 0 },
  { code: '31', name: 'Белгородская область', clicks: 0 },
  { code: '32', name: 'Брянская область', clicks: 0 },
  { code: '33', name: 'Владимирская область', clicks: 0 },
  { code: '34', name: 'Волгоградская область', clicks: 0 },
  { code: '35', name: 'Вологодская область', clicks: 0 },
  { code: '36', name: 'Воронежская область', clicks: 0 },
  { code: '37', name: 'Ивановская область', clicks: 0 },
  { code: '38', name: 'Иркутская область', clicks: 0 },
  { code: '39', name: 'Калининградская область', clicks: 0 },
  { code: '40', name: 'Калужская область', clicks: 0 },
  { code: '41', name: 'Камчатский край', clicks: 0 },
  { code: '42', name: 'Кемеровская область', clicks: 0 },
  { code: '43', name: 'Кировская область', clicks: 0 },
  { code: '44', name: 'Костромская область', clicks: 0 },
  { code: '45', name: 'Курганская область', clicks: 0 },
  { code: '46', name: 'Курская область', clicks: 0 },
  { code: '47', name: 'Ленинградская область', clicks: 0 },
  { code: '48', name: 'Липецкая область', clicks: 0 },
  { code: '49', name: 'Магаданская область', clicks: 0 },
  { code: '50', name: 'Московская область', clicks: 0 },
  { code: '51', name: 'Мурманская область', clicks: 0 },
  { code: '52', name: 'Нижегородская область', clicks: 0 },
  { code: '53', name: 'Новгородская область', clicks: 0 },
  { code: '54', name: 'Новосибирская область', clicks: 0 },
  { code: '55', name: 'Омская область', clicks: 0 },
  { code: '56', name: 'Оренбургская область', clicks: 0 },
  { code: '57', name: 'Орловская область', clicks: 0 },
  { code: '58', name: 'Пензенская область', clicks: 0 },
  { code: '59', name: 'Пермский край', clicks: 0 },
  { code: '60', name: 'Псковская область', clicks: 0 },
  { code: '61', name: 'Ростовская область', clicks: 0 },
  { code: '62', name: 'Рязанская область', clicks: 0 },
  { code: '63', name: 'Самарская область', clicks: 0 },
  { code: '64', name: 'Саратовская область', clicks: 0 },
  { code: '65', name: 'Сахалинская область', clicks: 0 },
  { code: '66', name: 'Свердловская область', clicks: 0 },
  { code: '67', name: 'Смоленская область', clicks: 0 },
  { code: '68', name: 'Тамбовская область', clicks: 0 },
  { code: '69', name: 'Тверская область', clicks: 0 },
  { code: '70', name: 'Томская область', clicks: 0 },
  { code: '71', name: 'Тульская область', clicks: 0 },
  { code: '72', name: 'Тюменская область', clicks: 0 },
  { code: '73', name: 'Ульяновская область', clicks: 0 },
  { code: '74', name: 'Челябинская область', clicks: 0 },
  { code: '75', name: 'Забайкальский край', clicks: 0 },
  { code: '76', name: 'Ярославская область', clicks: 0 },
  { code: '77', name: 'Москва', clicks: 0 },
  { code: '78', name: 'Санкт-Петербург', clicks: 0 },
  { code: '79', name: 'Еврейская АО', clicks: 0 },
  { code: '82', name: 'Республика Крым', clicks: 0 },
  { code: '83', name: 'Ненецкий АО', clicks: 0 },
  { code: '86', name: 'Ханты-Мансийский АО', clicks: 0 },
  { code: '87', name: 'Чукотский АО', clicks: 0 },
  { code: '89', name: 'Ямало-Ненецкий АО', clicks: 0 },
  { code: '92', name: 'Севастополь', clicks: 0 },
  { code: '95', name: 'Чеченская Республика', clicks: 0 },
];

export default function Index() {
  const [regions, setRegions] = useState<Region[]>(RUSSIAN_REGIONS);
  const [activeTab, setActiveTab] = useState<'table' | 'map'>('table');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { toast } = useToast();

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeTab === 'table') {
      setActiveTab('map');
    }
    if (isRightSwipe && activeTab === 'map') {
      setActiveTab('table');
    }
  };

  const handleRegionClick = (code: string) => {
    setRegions(prev => prev.map(region => 
      region.code === code 
        ? { ...region, clicks: region.clicks + 1 }
        : region
    ));
    
    const region = regions.find(r => r.code === code);
    if (region && (region.clicks + 1) % 5 === 0) {
      toast({
        title: '🎉 Отлично!',
        description: `${region.name}: ${region.clicks + 1} кликов!`,
      });
    }
  };

  const handleReset = () => {
    setRegions(RUSSIAN_REGIONS);
    toast({
      title: '🔄 Сброшено',
      description: 'Все результаты обнулены',
    });
  };

  const topRegions = [...regions]
    .filter(r => r.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const totalClicks = regions.reduce((sum, r) => sum + r.clicks, 0);
  const completedRegions = regions.filter(r => r.clicks > 0).length;

  return (
    <div 
      className="min-h-screen pb-20 touch-manipulation"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            🚗 Регионы России
          </h1>
          <p className="text-muted-foreground text-lg">Изучай автомобильные коды регионов</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6 animate-scale-in">
          <Card className="p-4 text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="text-3xl font-bold">{totalClicks}</div>
            <div className="text-xs opacity-90 mt-1">Всего кликов</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <div className="text-3xl font-bold">{completedRegions}</div>
            <div className="text-xs opacity-90 mt-1">Изучено</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <div className="text-3xl font-bold">{regions.length}</div>
            <div className="text-xs opacity-90 mt-1">Регионов</div>
          </Card>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('table')}
            className={`flex-1 h-14 text-base font-semibold transition-all ${
              activeTab === 'table'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon name="Table" className="mr-2" size={20} />
            Таблица
          </Button>
          <Button
            onClick={() => setActiveTab('map')}
            className={`flex-1 h-14 text-base font-semibold transition-all ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon name="Map" className="mr-2" size={20} />
            Карта
          </Button>
        </div>

        {activeTab === 'table' ? (
          <div className="animate-slide-right">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Автомобильные коды</h2>
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <Icon name="RotateCcw" className="mr-2" size={16} />
                Сбросить
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {regions.map((region) => (
                <Card
                  key={region.code}
                  onClick={() => handleRegionClick(region.code)}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 relative ${
                    region.clicks > 0
                      ? 'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-500 shadow-lg'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  {region.clicks > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white border-2 border-white font-bold text-sm px-2 py-1 animate-pulse-success">
                      {region.clicks}
                    </Badge>
                  )}
                  <div className={`text-2xl font-bold mb-1 ${region.clicks > 0 ? 'text-white' : 'text-purple-600'}`}>
                    {region.code}
                  </div>
                  <div className={`text-xs line-clamp-2 ${region.clicks > 0 ? 'text-white' : 'text-gray-600'}`}>
                    {region.name}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-slide-left">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Map" size={28} className="text-purple-600" />
              Интерактивная карта России
            </h2>
            
            <RussiaMap regions={regions} onRegionClick={handleRegionClick} />

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-orange-500" />
                🏆 Топ-5 регионов
              </h3>
              {topRegions.length > 0 ? (
                <div className="space-y-2">
                  {topRegions.map((region, index) => (
                    <Card
                      key={region.code}
                      className={`p-3 bg-gradient-to-r ${
                        index === 0
                          ? 'from-yellow-400 to-yellow-500 text-yellow-900'
                          : index === 1
                          ? 'from-gray-300 to-gray-400 text-gray-900'
                          : index === 2
                          ? 'from-orange-400 to-orange-500 text-orange-900'
                          : 'from-green-400 to-green-500 text-white'
                      } border-0 shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </div>
                          <div>
                            <div className="font-bold">{region.code}</div>
                            <div className="text-xs opacity-90">{region.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{region.clicks}</div>
                          <div className="text-xs opacity-90">кликов</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center text-muted-foreground">
                  <Icon name="Trophy" className="mx-auto mb-2 text-gray-400" size={40} />
                  <p className="text-sm">Начни кликать по регионам!</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}