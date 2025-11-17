import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Talk {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  duration: string;
  views: number;
  date: string;
  description: string;
  slides: string[];
  isMyTalk: boolean;
}

const mockTalks: Talk[] = [
  {
    id: 1,
    title: 'Будущее искусственного интеллекта в медицине',
    author: {
      name: 'Анна Петрова',
      avatar: 'AP',
      role: 'Исследователь AI'
    },
    category: 'Технологии',
    duration: '45 мин',
    views: 1234,
    date: '15 ноября 2024',
    description: 'Обзор последних достижений в применении машинного обучения для диагностики заболеваний',
    slides: ['🧠', '🔬', '💡', '📊'],
    isMyTalk: false
  },
  {
    id: 2,
    title: 'Квантовые вычисления: прорыв или миф?',
    author: {
      name: 'Дмитрий Козлов',
      avatar: 'ДК',
      role: 'Квантовый физик'
    },
    category: 'Наука',
    duration: '60 мин',
    views: 892,
    date: '10 ноября 2024',
    description: 'Разбор реальных возможностей квантовых компьютеров и перспектив развития технологии',
    slides: ['⚛️', '🔢', '🌌', '🚀'],
    isMyTalk: true
  },
  {
    id: 3,
    title: 'Дизайн-мышление в стартапах',
    author: {
      name: 'Мария Соколова',
      avatar: 'МС',
      role: 'Product Designer'
    },
    category: 'Бизнес',
    duration: '30 мин',
    views: 2103,
    date: '5 ноября 2024',
    description: 'Практические методики применения дизайн-мышления для создания успешных продуктов',
    slides: ['💭', '✏️', '🎨', '🎯'],
    isMyTalk: false
  },
  {
    id: 4,
    title: 'Блокчейн за пределами криптовалют',
    author: {
      name: 'Алексей Иванов',
      avatar: 'АИ',
      role: 'Blockchain Developer'
    },
    category: 'Технологии',
    duration: '50 мин',
    views: 756,
    date: '1 ноября 2024',
    description: 'Реальные примеры применения блокчейна в логистике, здравоохранении и госуслугах',
    slides: ['🔗', '📦', '🏥', '🏛️'],
    isMyTalk: true
  },
  {
    id: 5,
    title: 'Психология продуктивности',
    author: {
      name: 'Елена Волкова',
      avatar: 'ЕВ',
      role: 'Психолог'
    },
    category: 'Психология',
    duration: '40 мин',
    views: 1567,
    date: '28 октября 2024',
    description: 'Научный подход к повышению личной эффективности и борьбе с прокрастинацией',
    slides: ['🧘', '⏰', '📈', '✅'],
    isMyTalk: false
  },
  {
    id: 6,
    title: 'Web3 и децентрализованный интернет',
    author: {
      name: 'Павел Смирнов',
      avatar: 'ПС',
      role: 'Web3 Architect'
    },
    category: 'Технологии',
    duration: '55 мин',
    views: 934,
    date: '20 октября 2024',
    description: 'Архитектура децентрализованных приложений и будущее интернета без посредников',
    slides: ['🌐', '🔐', '💎', '🌟'],
    isMyTalk: true
  }
];

const categories = ['Все', 'Технологии', 'Наука', 'Бизнес', 'Психология'];

const Index = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const myTalks = mockTalks.filter(talk => talk.isMyTalk);
  const communityTalks = mockTalks.filter(talk => !talk.isMyTalk);

  const filteredMyTalks = myTalks.filter(talk => {
    const matchesSearch = talk.title.toLowerCase().includes(search.toLowerCase()) ||
                         talk.author.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || talk.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCommunityTalks = communityTalks.filter(talk => {
    const matchesSearch = talk.title.toLowerCase().includes(search.toLowerCase()) ||
                         talk.author.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || talk.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openTalk = (talk: Talk) => {
    setSelectedTalk(talk);
    setCurrentSlide(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Presentation" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TalkHub
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Доклады</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Авторы</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">О проекте</a>
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Войти
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Лучшие доклады<br />в одном месте
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Исследуйте знания от ведущих экспертов. Учитесь, вдохновляйтесь, развивайтесь.
          </p>
          
          <div className="max-w-2xl mx-auto relative animate-scale-in">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Найти доклад или автора..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-2 border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-primary to-secondary" 
                  : "border-border hover:border-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="User" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Мои доклады</h3>
                  <p className="text-muted-foreground">Ваши опубликованные презентации</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить доклад
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="FileText" size={20} />
                  <span>{filteredMyTalks.length}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyTalks.map((talk, index) => (
              <Card 
                key={talk.id} 
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer border-primary/50 hover:border-primary animate-fade-in overflow-hidden relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openTalk(talk)}
              >
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-primary/90 backdrop-blur-sm">
                    <Icon name="Star" size={12} className="mr-1" />
                    Мой
                  </Badge>
                </div>
                <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50 group-hover:scale-110 transition-transform">
                    {talk.slides[0]}
                  </div>
                  <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
                    {talk.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {talk.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {talk.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {talk.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{talk.author.name}</p>
                        <p className="text-xs text-muted-foreground">{talk.author.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{talk.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        <span>{talk.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      <span>{talk.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>

          <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold">Доклады сообщества</h3>
                <p className="text-muted-foreground">Популярные презентации от других авторов</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Sparkles" size={20} />
              <span>{filteredCommunityTalks.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunityTalks.map((talk, index) => (
              <Card 
                key={talk.id} 
                className="group hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 cursor-pointer border-border hover:border-secondary animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openTalk(talk)}
              >
                <div className="h-48 bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50 group-hover:scale-110 transition-transform">
                    {talk.slides[0]}
                  </div>
                  <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
                    {talk.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="group-hover:text-secondary transition-colors line-clamp-2">
                    {talk.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {talk.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                          {talk.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{talk.author.name}</p>
                        <p className="text-xs text-muted-foreground">{talk.author.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{talk.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        <span>{talk.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      <span>{talk.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedTalk} onOpenChange={() => setSelectedTalk(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTalk && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl mb-4">{selectedTalk.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-16 flex items-center justify-center relative overflow-hidden">
                  <div className="text-9xl animate-scale-in">
                    {selectedTalk.slides[currentSlide]}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {currentSlide + 1} / {selectedTalk.slides.length}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  
                  <div className="flex gap-2">
                    {selectedTalk.slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide 
                            ? 'bg-primary w-8' 
                            : 'bg-border hover:bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(Math.min(selectedTalk.slides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === selectedTalk.slides.length - 1}
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                      {selectedTalk.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{selectedTalk.author.name}</h4>
                    <p className="text-muted-foreground">{selectedTalk.author.role}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Подписаться
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Описание доклада</h4>
                  <p className="text-muted-foreground">{selectedTalk.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{selectedTalk.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={16} />
                      <span>{selectedTalk.views} просмотров</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      <span>{selectedTalk.date}</span>
                    </div>
                  </div>
                  <Badge>{selectedTalk.category}</Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border py-12 px-4 mt-20">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 TalkHub. Платформа для докладов и обмена знаниями.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;