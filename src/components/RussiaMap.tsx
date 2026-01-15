import { useState } from 'react';

interface Region {
  code: string;
  name: string;
  clicks: number;
}

interface RussiaMapProps {
  regions: Region[];
  onRegionClick: (code: string) => void;
}

interface RegionPath {
  code: string;
  d: string;
  name: string;
}

const regionPaths: RegionPath[] = [
  { code: '77', name: 'Москва', d: 'M 320 180 L 325 178 L 328 182 L 325 185 L 320 183 Z' },
  { code: '78', name: 'Санкт-Петербург', d: 'M 310 125 L 315 123 L 318 127 L 315 130 L 310 128 Z' },
  { code: '39', name: 'Калининградская обл.', d: 'M 220 150 L 235 148 L 238 155 L 230 160 L 220 158 Z' },
  { code: '47', name: 'Ленинградская обл.', d: 'M 300 115 L 320 110 L 335 120 L 330 135 L 310 140 L 295 130 Z' },
  { code: '60', name: 'Псковская обл.', d: 'M 270 145 L 290 140 L 295 155 L 285 165 L 270 160 Z' },
  { code: '53', name: 'Новгородская обл.', d: 'M 290 135 L 310 130 L 315 145 L 305 155 L 290 150 Z' },
  { code: '29', name: 'Архангельская обл.', d: 'M 340 60 L 420 50 L 450 75 L 440 110 L 400 120 L 360 100 L 340 80 Z' },
  { code: '35', name: 'Вологодская обл.', d: 'M 330 130 L 370 120 L 390 140 L 380 160 L 350 165 L 330 150 Z' },
  { code: '11', name: 'Республика Коми', d: 'M 400 80 L 480 70 L 520 90 L 510 130 L 470 140 L 420 120 L 400 100 Z' },
  { code: '51', name: 'Мурманская обл.', d: 'M 330 20 L 410 10 L 450 30 L 440 60 L 380 70 L 330 50 Z' },
  { code: '10', name: 'Республика Карелия', d: 'M 310 90 L 350 80 L 370 100 L 360 120 L 330 125 L 310 110 Z' },
  { code: '69', name: 'Тверская обл.', d: 'M 305 155 L 330 150 L 340 165 L 330 180 L 310 175 Z' },
  { code: '76', name: 'Ярославская обл.', d: 'M 335 155 L 360 150 L 370 165 L 360 178 L 340 173 Z' },
  { code: '44', name: 'Костромская обл.', d: 'M 365 155 L 395 148 L 410 163 L 400 178 L 375 180 L 365 168 Z' },
  { code: '37', name: 'Ивановская обл.', d: 'M 345 170 L 365 165 L 372 178 L 362 188 L 345 183 Z' },
  { code: '33', name: 'Владимирская обл.', d: 'M 335 175 L 355 170 L 362 183 L 352 193 L 335 188 Z' },
  { code: '50', name: 'Московская обл.', d: 'M 315 175 L 345 165 L 360 180 L 355 200 L 330 205 L 310 195 L 308 180 Z' },
  { code: '40', name: 'Калужская обл.', d: 'M 305 185 L 325 180 L 335 195 L 325 208 L 305 203 Z' },
  { code: '67', name: 'Смоленская обл.', d: 'M 280 175 L 305 170 L 315 188 L 305 200 L 280 195 Z' },
  { code: '32', name: 'Брянская обл.', d: 'M 280 195 L 305 190 L 312 205 L 298 218 L 280 213 Z' },
  { code: '57', name: 'Орловская обл.', d: 'M 305 200 L 328 195 L 335 208 L 322 220 L 305 215 Z' },
  { code: '71', name: 'Тульская обл.', d: 'M 325 200 L 348 195 L 355 208 L 342 220 L 325 215 Z' },
  { code: '62', name: 'Рязанская обл.', d: 'M 345 200 L 370 195 L 380 210 L 368 223 L 345 218 Z' },
  { code: '48', name: 'Липецкая обл.', d: 'M 330 215 L 352 210 L 360 223 L 348 235 L 330 230 Z' },
  { code: '36', name: 'Воронежская обл.', d: 'M 320 225 L 345 220 L 358 238 L 345 253 L 320 248 Z' },
  { code: '31', name: 'Белгородская обл.', d: 'M 310 240 L 332 235 L 340 248 L 328 260 L 310 255 Z' },
  { code: '46', name: 'Курская обл.', d: 'M 300 225 L 323 220 L 333 238 L 320 250 L 300 245 Z' },
  { code: '52', name: 'Нижегородская обл.', d: 'M 375 185 L 415 175 L 435 195 L 425 218 L 395 223 L 375 208 Z' },
  { code: '12', name: 'Республика Марий Эл', d: 'M 400 175 L 425 170 L 435 185 L 425 198 L 400 193 Z' },
  { code: '21', name: 'Чувашская Республика', d: 'M 395 195 L 418 190 L 428 203 L 418 215 L 395 210 Z' },
  { code: '16', name: 'Республика Татарстан', d: 'M 420 185 L 465 175 L 485 195 L 475 220 L 440 228 L 420 210 Z' },
  { code: '18', name: 'Удмуртская Республика', d: 'M 435 165 L 475 155 L 490 173 L 480 190 L 450 195 L 435 180 Z' },
  { code: '43', name: 'Кировская обл.', d: 'M 410 145 L 460 135 L 485 155 L 475 180 L 440 188 L 410 170 Z' },
  { code: '59', name: 'Пермский край', d: 'M 470 140 L 530 128 L 560 150 L 550 185 L 510 195 L 475 175 Z' },
  { code: '66', name: 'Свердловская обл.', d: 'M 520 150 L 580 138 L 610 165 L 600 200 L 560 208 L 525 185 Z' },
  { code: '45', name: 'Курганская обл.', d: 'M 555 195 L 595 185 L 610 203 L 598 220 L 565 225 L 555 210 Z' },
  { code: '72', name: 'Тюменская обл.', d: 'M 520 115 L 620 95 L 680 125 L 670 190 L 620 205 L 570 185 L 530 155 Z' },
  { code: '86', name: 'Ханты-Мансийский АО', d: 'M 560 80 L 640 65 L 680 90 L 670 130 L 610 145 L 565 115 Z' },
  { code: '89', name: 'Ямало-Ненецкий АО', d: 'M 580 30 L 680 15 L 730 45 L 720 95 L 660 110 L 600 85 L 580 55 Z' },
  { code: '74', name: 'Челябинская обл.', d: 'M 555 210 L 600 200 L 615 220 L 603 240 L 565 245 L 555 228 Z' },
  { code: '56', name: 'Оренбургская обл.', d: 'M 490 215 L 560 205 L 585 235 L 570 265 L 510 273 L 490 245 Z' },
  { code: '02', name: 'Республика Башкортостан', d: 'M 485 195 L 545 183 L 565 208 L 553 238 L 505 245 L 485 220 Z' },
  { code: '63', name: 'Самарская обл.', d: 'M 440 225 L 495 215 L 510 238 L 498 260 L 450 265 L 440 245 Z' },
  { code: '73', name: 'Ульяновская обл.', d: 'M 420 210 L 455 200 L 470 220 L 458 238 L 425 243 L 420 228 Z' },
  { code: '64', name: 'Саратовская обл.', d: 'M 420 240 L 470 230 L 490 255 L 478 285 L 435 290 L 420 268 Z' },
  { code: '34', name: 'Волгоградская обл.', d: 'M 385 250 L 435 240 L 460 270 L 448 305 L 400 310 L 385 280 Z' },
  { code: '61', name: 'Ростовская обл.', d: 'M 360 270 L 405 260 L 430 290 L 418 318 L 375 323 L 360 298 Z' },
  { code: '23', name: 'Краснодарский край', d: 'M 330 285 L 375 275 L 398 303 L 385 328 L 340 333 L 330 310 Z' },
  { code: '26', name: 'Ставропольский край', d: 'M 365 295 L 410 285 L 430 310 L 418 333 L 375 338 L 365 318 Z' },
  { code: '05', name: 'Республика Дагестан', d: 'M 405 305 L 445 295 L 465 318 L 453 338 L 415 343 L 405 323 Z' },
  { code: '07', name: 'Кабардино-Балкарская Республика', d: 'M 375 310 L 410 305 L 423 320 L 413 333 L 380 335 L 375 323 Z' },
  { code: '15', name: 'Республика Северная Осетия', d: 'M 385 315 L 415 310 L 425 323 L 415 335 L 390 337 L 385 328 Z' },
  { code: '06', name: 'Республика Ингушетия', d: 'M 405 318 L 428 315 L 435 325 L 428 333 L 408 333 L 405 328 Z' },
  { code: '95', name: 'Чеченская Республика', d: 'M 420 315 L 450 310 L 460 323 L 450 335 L 425 337 L 420 328 Z' },
  { code: '01', name: 'Республика Адыгея', d: 'M 350 300 L 370 298 L 375 308 L 368 315 L 352 313 L 350 308 Z' },
  { code: '08', name: 'Республика Калмыкия', d: 'M 400 290 L 445 280 L 465 305 L 453 328 L 415 333 L 400 313 Z' },
  { code: '09', name: 'Карачаево-Черкесская Республика', d: 'M 360 305 L 390 300 L 400 313 L 390 323 L 365 323 L 360 315 Z' },
  { code: '30', name: 'Астраханская обл.', d: 'M 445 295 L 485 285 L 502 308 L 490 328 L 455 333 L 445 313 Z' },
  { code: '92', name: 'Севастополь', d: 'M 305 305 L 315 303 L 318 308 L 315 313 L 307 311 Z' },
  { code: '82', name: 'Республика Крым', d: 'M 290 298 L 330 293 L 345 308 L 335 323 L 295 325 L 290 313 Z' },
  { code: '55', name: 'Омская обл.', d: 'M 610 190 L 670 178 L 695 203 L 685 233 L 635 240 L 610 218 Z' },
  { code: '54', name: 'Новосибирская обл.', d: 'M 660 200 L 720 188 L 750 215 L 738 248 L 690 255 L 660 230 Z' },
  { code: '42', name: 'Кемеровская обл.', d: 'M 700 205 L 750 195 L 775 218 L 763 245 L 720 250 L 700 228 Z' },
  { code: '70', name: 'Томская обл.', d: 'M 660 165 L 720 153 L 750 178 L 738 210 L 690 218 L 660 190 Z' },
  { code: '22', name: 'Алтайский край', d: 'M 690 230 L 745 220 L 770 245 L 758 273 L 710 280 L 690 255 Z' },
  { code: '04', name: 'Республика Алтай', d: 'M 740 240 L 780 233 L 800 253 L 788 278 L 750 283 L 740 263 Z' },
  { code: '24', name: 'Красноярский край', d: 'M 730 90 L 850 70 L 920 110 L 910 200 L 840 220 L 760 190 L 730 140 Z' },
  { code: '19', name: 'Республика Хакасия', d: 'M 770 210 L 825 200 L 845 223 L 833 248 L 790 253 L 770 233 Z' },
  { code: '17', name: 'Республика Тыва', d: 'M 820 220 L 880 210 L 905 238 L 893 268 L 840 275 L 820 248 Z' },
  { code: '38', name: 'Иркутская обл.', d: 'M 860 180 L 950 165 L 990 200 L 978 250 L 910 265 L 860 230 Z' },
  { code: '03', name: 'Республика Бурятия', d: 'M 950 210 L 1020 195 L 1050 230 L 1038 270 L 980 280 L 950 250 Z' },
  { code: '75', name: 'Забайкальский край', d: 'M 1010 220 L 1090 205 L 1130 245 L 1118 290 L 1050 303 L 1010 268 Z' },
  { code: '14', name: 'Республика Саха (Якутия)', d: 'M 920 50 L 1100 30 L 1250 80 L 1240 180 L 1140 210 L 1000 185 L 920 130 Z' },
  { code: '28', name: 'Амурская обл.', d: 'M 1100 240 L 1180 228 L 1215 263 L 1203 298 L 1140 308 L 1100 278 Z' },
  { code: '79', name: 'Еврейская АО', d: 'M 1160 270 L 1210 263 L 1225 283 L 1213 303 L 1170 308 L 1160 290 Z' },
  { code: '27', name: 'Хабаровский край', d: 'M 1180 210 L 1280 190 L 1340 240 L 1328 310 L 1250 325 L 1180 285 Z' },
  { code: '25', name: 'Приморский край', d: 'M 1210 285 L 1270 275 L 1295 303 L 1283 330 L 1230 338 L 1210 313 Z' },
  { code: '65', name: 'Сахалинская обл.', d: 'M 1320 240 L 1360 235 L 1375 270 L 1363 310 L 1330 315 L 1320 280 Z' },
  { code: '41', name: 'Камчатский край', d: 'M 1340 160 L 1400 148 L 1430 185 L 1418 235 L 1370 245 L 1340 205 Z' },
  { code: '49', name: 'Магаданская обл.', d: 'M 1280 120 L 1360 108 L 1400 145 L 1388 195 L 1330 205 L 1280 170 Z' },
  { code: '87', name: 'Чукотский АО', d: 'M 1340 50 L 1440 35 L 1490 75 L 1478 125 L 1410 140 L 1340 95 Z' },
  { code: '83', name: 'Ненецкий АО', d: 'M 480 45 L 560 35 L 590 60 L 580 90 L 520 98 L 480 73 Z' },
  { code: '13', name: 'Республика Мордовия', d: 'M 385 205 L 415 200 L 425 215 L 415 228 L 390 228 L 385 218 Z' },
  { code: '58', name: 'Пензенская обл.', d: 'M 395 215 L 425 210 L 438 228 L 428 243 L 400 243 L 395 230 Z' },
  { code: '68', name: 'Тамбовская обл.', d: 'M 355 225 L 385 220 L 395 238 L 385 253 L 360 253 L 355 240 Z' },
];

export default function RussiaMap({ regions, onRegionClick }: RussiaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getRegionColor = (code: string) => {
    const region = regions.find(r => r.code === code);
    if (!region || region.clicks === 0) return '#f3f4f6';
    
    const intensity = Math.min(region.clicks / 10, 1);
    const red = Math.round(16 + (34 - 16) * intensity);
    const green = Math.round(185 - (185 - 128) * intensity);
    const blue = Math.round(129 - (129 - 0) * intensity);
    
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const getRegionData = (code: string) => {
    return regions.find(r => r.code === code);
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 overflow-hidden">
      <svg
        viewBox="0 0 1500 360"
        className="w-full h-auto"
        style={{ maxHeight: '70vh' }}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {regionPaths.map((path) => {
          const regionData = getRegionData(path.code);
          const isHovered = hoveredRegion === path.code;
          const hasClicks = regionData && regionData.clicks > 0;

          return (
            <g key={path.code}>
              <path
                d={path.d}
                fill={getRegionColor(path.code)}
                stroke={hasClicks ? '#10b981' : '#9ca3af'}
                strokeWidth={isHovered ? '2' : '1'}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  filter: hasClicks ? 'url(#shadow)' : 'none',
                  opacity: isHovered ? 0.9 : 1,
                }}
                onClick={() => onRegionClick(path.code)}
                onMouseEnter={() => setHoveredRegion(path.code)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
              
              <text
                x={path.d.match(/M (\d+)/)?.[1] || 0}
                y={(parseInt(path.d.match(/M \d+ (\d+)/)?.[1] || '0') + 8)}
                fontSize="11"
                fontWeight="600"
                fill={hasClicks ? '#ffffff' : '#374151'}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  textShadow: hasClicks ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {path.code}
              </text>

              {hasClicks && regionData && (
                <circle
                  cx={(parseInt(path.d.match(/M (\d+)/)?.[1] || '0') + 15)}
                  cy={(parseInt(path.d.match(/M \d+ (\d+)/)?.[1] || '0') - 5)}
                  r="8"
                  fill="#f97316"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-pulse-success"
                />
              )}
              {hasClicks && regionData && (
                <text
                  x={(parseInt(path.d.match(/M (\d+)/)?.[1] || '0') + 15)}
                  y={(parseInt(path.d.match(/M \d+ (\d+)/)?.[1] || '0') - 2)}
                  fontSize="9"
                  fontWeight="700"
                  fill="#ffffff"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {regionData.clicks}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hoveredRegion && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 animate-fade-in">
          <div className="text-sm font-bold text-gray-900">
            {regionPaths.find(r => r.code === hoveredRegion)?.name}
          </div>
          <div className="text-xs text-gray-600">
            Код: {hoveredRegion} • Кликов: {getRegionData(hoveredRegion)?.clicks || 0}
          </div>
        </div>
      )}
    </div>
  );
}
