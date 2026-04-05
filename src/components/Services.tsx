import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Antenna,
  Bus,
  Building2,
  Camera,
  CheckCircle2,
  Globe2,
  Network,
  Router,
  SatelliteDish,
  Signal,
  Wifi,
  Wrench,
} from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Services = () => {
  const { ref, isVisible } = useScrollAnimation()
  const [showAll, setShowAll] = useState(false)

  const services = useMemo(
    () => [
      {
        title: 'Монтаж и активация Starlink',
        description: 'Полный запуск под ключ: установка, настройка, тест сигнала и передача готового решения.',
        icon: SatelliteDish,
      },
      {
        title: 'Wi-Fi сеть для дома и офиса',
        description: 'Настраиваем стабильное покрытие внутри помещения и подключаем рабочие устройства.',
        icon: Wifi,
      },
      {
        title: 'Mesh Wi-Fi для 2-3 этажей',
        description: 'Расширяем покрытие на большие площади без провалов и разрывов связи.',
        icon: Network,
      },
      {
        title: 'Мобильный Starlink для транспорта',
        description: 'Решения для автобусов, спецтехники и мобильных команд с устойчивой связью в пути.',
        icon: Bus,
      },
      {
        title: 'Корпоративные и B2B решения',
        description: 'Сети для филиалов, складов, стройплощадок и удаленных объектов любого масштаба.',
        icon: Building2,
      },
      {
        title: 'Радиомост PtP между зданиями',
        description: 'Организуем связь точка-точка для объединения удаленных зданий в единую сеть.',
        icon: Signal,
      },
      {
        title: 'Подключение IP-камер',
        description: 'Интегрируем видеонаблюдение в сеть и настраиваем удаленный доступ по запросу.',
        icon: Camera,
      },
      {
        title: 'Настройка роутеров и ретрансляторов',
        description: 'Оптимизируем маршрутизацию, Wi-Fi и роуминг, чтобы сеть работала стабильно.',
        icon: Router,
      },
      {
        title: 'Удаленная активация и запуск',
        description: 'Проводим дистанционный запуск оборудования и помогаем на каждом этапе подключения.',
        icon: Globe2,
      },
      {
        title: 'Аренда Starlink для мероприятий',
        description: 'Быстрое развертывание интернета для ивентов, выставок, съемок и стримов.',
        icon: Antenna,
      },
      {
        title: 'Аренда для туров и экспедиций',
        description: 'Надежная связь для полевых команд, выездов в горы, рыбалки и удаленных маршрутов.',
        icon: Wrench,
      },
      {
        title: 'Индивидуальные проекты под задачу',
        description: 'Если кейс нестандартный, проектируем персональную схему под ваш объект и бюджет.',
        icon: CheckCircle2,
      },
    ],
    [],
  )

  const visibleServices = showAll ? services : services.slice(0, 6)

  return (
    <section id="services" ref={ref} className="bg-[var(--surface-2)] py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-6 max-w-3xl text-center md:mb-8"
        >
          <h2 className="mb-3 bg-gradient-to-r from-[#E4EEFA] to-[#8AAED8] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
            Услуги под ключ
          </h2>
          <p className="text-sm text-[var(--muted)] md:text-base">
            Закрываем весь цикл работ: от установки Starlink до сетевой инфраструктуры, транспорта и B2B-задач.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {visibleServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-white/[0.08] bg-[#0B1121]/80 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/[0.30] hover:shadow-lg hover:shadow-black/40"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/[0.12] text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-[var(--text)] md:text-lg">{service.title}</h3>
                <p className="text-sm leading-snug text-[var(--muted)]">{service.description}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-4 flex flex-col items-center gap-3 md:mt-5"
        >
          {services.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:border-white/[0.22] hover:bg-white/[0.08]"
            >
              {showAll ? 'Скрыть часть услуг' : 'Показать все услуги'}
            </button>
          )}

          <div className="w-full rounded-2xl border border-white/[0.09] bg-[#0B1121]/80 p-4 text-center md:p-5">
            <p className="text-sm font-semibold text-[var(--text)] md:text-base">
              Не нашли нужную услугу? Соберем персональное решение под ваш объект за 15 минут.
            </p>
            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-xl bg-accent/[0.15] border border-accent/[0.30] px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/[0.25] hover:border-accent/[0.50]"
            >
              Обсудить проект в WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
