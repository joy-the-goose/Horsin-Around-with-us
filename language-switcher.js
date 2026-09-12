document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    if (!navContainer.querySelector('.lang-switcher')) {
        navContainer.insertAdjacentHTML(
            'beforeend',
            `
            <div class="lang-switcher">
                <button type="button" class="lang-toggle" aria-expanded="false" aria-controls="lang-menu">
                    <span class="lang-current">English</span>
                    <span class="lang-caret">▾</span>
                </button>
                <div class="lang-menu" id="lang-menu" role="menu">
                    <button type="button" class="lang-option active" data-lang="en" role="menuitem">English</button>
                    <button type="button" class="lang-option" data-lang="zh-CN" role="menuitem">中文（简体）</button>
                    <button type="button" class="lang-option" data-lang="zh-TW" role="menuitem">中文（繁體）</button>
                    <button type="button" class="lang-option" data-lang="fr" role="menuitem">Français</button>
                    <button type="button" class="lang-option" data-lang="es" role="menuitem">Español</button>
                    <button type="button" class="lang-option" data-lang="pt" role="menuitem">Português</button>
                    <button type="button" class="lang-option" data-lang="ja" role="menuitem">日本語</button>
                    <button type="button" class="lang-option" data-lang="de" role="menuitem">Deutsch</button>
                </div>
            </div>
            `
        );
    }

    const langSwitcher = navContainer.querySelector('.lang-switcher');
    const langToggle = navContainer.querySelector('.lang-toggle');
    const langCurrent = navContainer.querySelector('.lang-current');
    const langOptions = [...navContainer.querySelectorAll('.lang-option')];
    const pageKey = window.location.pathname.split('/').pop() || 'index.html';

    const navLabels = {
        en: {
            'index.html': 'Home',
            'forum.html': 'Forum',
            'history.html': 'History',
            'news.html': 'Latest News',
            'membership.html': 'Membership',
            'golden_horse.html': 'Vote For Horses!'
        },
        'zh-CN': {
            'index.html': '首页',
            'forum.html': '论坛',
            'history.html': '历史',
            'news.html': '最新消息',
            'membership.html': '会员',
            'golden_horse.html': 'Vote For Horses!'
        },
        'zh-TW': {
            'index.html': '首頁',
            'forum.html': '論壇',
            'history.html': '歷史',
            'news.html': '最新消息',
            'membership.html': '會員',
            'golden_horse.html': 'Vote For Horses!'
        },
        fr: {
            'index.html': 'Accueil',
            'forum.html': 'Forum',
            'history.html': 'Historique',
            'news.html': 'Actualités',
            'membership.html': 'Adhésion',
            'golden_horse.html': 'Vote For Horses!'
        },
        es: {
            'index.html': 'Inicio',
            'forum.html': 'Foro',
            'history.html': 'Historia',
            'news.html': 'Últimas noticias',
            'membership.html': 'Membresía',
            'golden_horse.html': 'Vote For Horses!'
        },
        pt: {
            'index.html': 'Início',
            'forum.html': 'Fórum',
            'history.html': 'História',
            'news.html': 'Últimas notícias',
            'membership.html': 'Membro',
            'golden_horse.html': 'Vote For Horses!'
        },
        ja: {
            'index.html': 'ホーム',
            'forum.html': 'フォーラム',
            'history.html': '歴史',
            'news.html': '最新ニュース',
            'membership.html': '会員',
            'golden_horse.html': 'Vote For Horses!'
        },
        de: {
            'index.html': 'Startseite',
            'forum.html': 'Forum',
            'history.html': 'Geschichte',
            'news.html': 'Neuigkeiten',
            'membership.html': 'Mitgliedschaft',
            'golden_horse.html': 'Vote For Horses!'
        }
    };

    const langNames = {
        en: 'English',
        'zh-CN': '中文（简体）',
        'zh-TW': '中文（繁體）',
        fr: 'Français',
        es: 'Español',
        pt: 'Português',
        ja: '日本語',
        de: 'Deutsch'
    };

    const pageTranslations = {
        'index.html': {
            textNodes: {
                'home-title': {
                    en: 'Leap Your Dreams, Ride the Hobby Horse',
                    'zh-CN': '跃向你的梦想，骑上竹马',
                    'zh-TW': '躍向你的夢想，騎上竹馬',
                    fr: 'Saisissez vos rêves, chevauchez le hobby horse',
                    es: 'Alcanza tus sueños, monta el hobby horse',
                    pt: 'Alcance seus sonhos, monte o hobby horse',
                    ja: '夢を乗り越え、ホビー・ホースに乗ろう',
                    de: 'Erreiche deine Träume, reite das Hobby-Horsing-Pferd'
                },
                'home-subtitle': {
                    en: 'Welcome to our Hobby Horsing Club! Experience the perfect blend of elegance, speed, and nature.',
                    'zh-CN': '欢迎来到我们的 Hobby Horsing Club！感受优雅、速度与自然的完美结合。',
                    'zh-TW': '歡迎來到我們的 Hobby Horsing Club！感受優雅、速度與自然的完美結合。',
                    fr: 'Bienvenue dans notre Hobby Horsing Club ! Découvrez un mélange parfait d’élégance, de vitesse et de nature.',
                    es: '¡Bienvenido a nuestro Hobby Horsing Club! Disfruta de la perfecta mezcla de elegancia, velocidad y naturaleza.',
                    pt: 'Bem-vindo ao nosso Hobby Horsing Club! Experimente a combinação perfeita de elegância, velocidade e natureza.',
                    ja: 'Hobby Horsing Club へようこそ！優雅さ、速さ、自然の調和を体感してください。',
                    de: 'Willkommen in unserem Hobby Horsing Club! Erlebe die perfekte Mischung aus Eleganz, Geschwindigkeit und Natur.'
                },
                'home-join': {
                    en: 'Join Us',
                    'zh-CN': '加入我们',
                    'zh-TW': '加入我們',
                    fr: 'Rejoignez-nous',
                    es: 'Únete a nosotros',
                    pt: 'Junte-se a nós',
                    ja: '参加しよう',
                    de: 'Jetzt beitreten'
                },
                'about-title': {
                    en: 'About the Club',
                    'zh-CN': '关于俱乐部',
                    'zh-TW': '關於俱樂部',
                    fr: 'À propos du club',
                    es: 'Sobre el club',
                    pt: 'Sobre o clube',
                    ja: 'クラブについて',
                    de: 'Über den Club'
                },
                'about-copy': {
                    en: 'We are dedicated to promoting a healthy lifestyle and imaginative competitive art. Whether you are a beginner or a veteran rider, there is a stage for you here.',
                    'zh-CN': '我们致力于推广健康的生活方式与富有想象力的竞技艺术。无论你是初学者还是资深骑手，都能在这里找到属于自己的舞台。',
                    'zh-TW': '我們致力於推廣健康的生活方式與富有想像力的競技藝術。無論你是初學者還是資深騎手，都能在這裡找到屬於自己的舞台。',
                    fr: 'Nous sommes déterminés à promouvoir un mode de vie sain et un art compétitif imaginatif. Que vous soyez débutant ou cavalier expérimenté, vous trouverez ici votre place.',
                    es: 'Estamos dedicados a promover un estilo de vida saludable y un arte competitivo imaginativo. Ya seas principiante o jinete experimentado, aquí encontrarás tu lugar.',
                    pt: 'Estamos dedicados a promover um estilo de vida saudável e uma arte competitiva imaginativa. Seja você iniciante ou cavaleiro experiente, há um espaço para você aqui.',
                    ja: '私たちは健やかなライフスタイルと創造的な競技芸術の発展に尽力しています。初心者でもベテランでも、ここにはあなたの舞台があります。',
                    de: 'Wir fördern einen gesunden Lebensstil und eine kreative, wettbewerbsorientierte Kunstform. Egal, ob du Anfänger oder erfahrener Reiter bist, hier findest du deine Bühne.'
                },
                'recent-title': {
                    en: 'Recent Focus',
                    'zh-CN': '近期关注',
                    'zh-TW': '近期關注',
                    fr: 'Focus récent',
                    es: 'Enfoque reciente',
                    pt: 'Foco recente',
                    ja: '最近の注目',
                    de: 'Aktueller Fokus'
                },
                'recent-copy': {
                    en: 'The Spring National Hobby Horse Obstacle Championship is starting next month! Training camp registration is now open. Come pick your horse and join the competition!',
                    'zh-CN': '春季全国 Hobby Horse 障碍赛将在下月开始！训练营报名现已开放。快来挑选你的马，加入比赛！',
                    'zh-TW': '春季全國 Hobby Horse 障礙賽將在下月開始！訓練營報名現已開放。快來挑選你的馬，加入比賽！',
                    fr: 'Le championnat national printanier d’obstacles de hobby horse commencera le mois prochain ! Les inscriptions au camp d’entraînement sont désormais ouvertes. Venez choisir votre cheval et rejoignez la compétition !',
                    es: '¡El Campeonato Nacional de Obstáculos de Hobby Horse comenzará el próximo mes! Las inscripciones al campamento de entrenamiento ya están abiertas. ¡Ven a elegir tu caballo y únete a la competencia!',
                    pt: 'O Campeonato Nacional de Obstáculos de Hobby Horse da primavera começará no próximo mês! As inscrições para o campo de treinamento já estão abertas. Venha escolher seu cavalo e entre na competição!',
                    ja: '春の全国ホビーホース障害大会が来月に始まります！トレーニングキャンプの登録はすでに開始しています。あなたの馬を選んで競技に参加しましょう！',
                    de: 'Die nationale Frühlingsmeisterschaft im Hobby-Horsing-Obstacle wird nächsten Monat starten! Die Anmeldung zum Trainingslager ist jetzt offen. Komm und wähle dein Pferd für den Wettbewerb!'
                },
                'history-card-title': {
                    en: 'History',
                    'zh-CN': '历史',
                    'zh-TW': '歷史',
                    fr: 'Historique',
                    es: 'Historia',
                    pt: 'História',
                    ja: '歴史',
                    de: 'Geschichte'
                },
                'history-card-copy': {
                    en: 'Explore the fascinating journey of this unique sport from Northern Europe to the rest of the world.',
                    'zh-CN': '探索这项独特运动从北欧走向世界的精彩旅程。',
                    'zh-TW': '探索這項獨特運動從北歐走向世界的精彩旅程。',
                    fr: 'Découvrez le fascinant parcours de ce sport unique, de l’Europe du Nord au reste du monde.',
                    es: 'Explora el fascinante recorrido de este deporte único desde el norte de Europa hasta el resto del mundo.',
                    pt: 'Explore a fascinante jornada desse esporte único, da Europa do Norte para o resto do mundo.',
                    ja: '北欧から世界へ広がる、このユニークなスポーツの魅力的な歴史を探ってみましょう。',
                    de: 'Entdecke die faszinierende Reise dieses einzigartigen Sports von Nordeuropa bis in den Rest der Welt.'
                },
                'history-card-btn': {
                    en: 'Learn More',
                    'zh-CN': '了解更多',
                    'zh-TW': '了解更多',
                    fr: 'En savoir plus',
                    es: 'Más información',
                    pt: 'Saiba mais',
                    ja: 'さらに詳しく',
                    de: 'Mehr erfahren'
                },
                'membership-card-title': {
                    en: 'Membership',
                    'zh-CN': '会员',
                    'zh-TW': '會員',
                    fr: 'Adhésion',
                    es: 'Membresía',
                    pt: 'Membro',
                    ja: '会員',
                    de: 'Mitgliedschaft'
                },
                'membership-card-copy': {
                    en: 'Learn about different membership levels, exclusive training courses, and custom equipment benefits.',
                    'zh-CN': '了解不同会员等级、专属训练课程以及定制装备权益。',
                    'zh-TW': '了解不同會員等級、專屬訓練課程以及定制裝備權益。',
                    fr: 'Découvrez les différents niveaux d’adhésion, les cours d’entraînement exclusifs et les avantages sur l’équipement personnalisé.',
                    es: 'Descubre los distintos niveles de membresía, cursos de entrenamiento exclusivos y beneficios para equipos personalizados.',
                    pt: 'Saiba mais sobre os diferentes níveis de membro, cursos exclusivos de treinamento e benefícios de equipamentos personalizados.',
                    ja: '会員レベル、限定トレーニングコース、カスタム機材特典について詳しく知りましょう。',
                    de: 'Erfahre mehr über unterschiedliche Mitgliedschaften, exklusive Trainingskurse und Vorteile für individuelle Ausrüstung.'
                },
                'membership-card-btn': {
                    en: 'Join Now',
                    'zh-CN': '立即加入',
                    'zh-TW': '立即加入',
                    fr: 'Rejoindre maintenant',
                    es: 'Únete ahora',
                    pt: 'Entre agora',
                    ja: '今すぐ参加',
                    de: 'Jetzt beitreten'
                },
                'qr-caption': {
                    en: 'Scan&Join!',
                    'zh-CN': '扫码加入！',
                    'zh-TW': '掃碼加入！',
                    fr: 'Scannez & rejoignez !',
                    es: '¡Escanea y únete!',
                    pt: 'Escaneie e junte-se!',
                    ja: 'スキャンして参加！',
                    de: 'Scannen & beitreten!'
                },
                'footer-copy': {
                    en: '© 2026 Hobby Horsing Club. Earthy handmade paper style home page. All rights reserved.',
                    'zh-CN': '© 2026 Hobby Horsing Club。手工纸质风格首页。保留所有权利。',
                    'zh-TW': '© 2026 Hobby Horsing Club。手工紙質風格首頁。保留所有權利。',
                    fr: '© 2026 Hobby Horsing Club. Style de page d’accueil en papier artisanal terreux. Tous droits réservés.',
                    es: '© 2026 Hobby Horsing Club. Estilo de página de inicio en papel artesanal terroso. Todos los derechos reservados.',
                    pt: '© 2026 Hobby Horsing Club. Estilo de página inicial em papel artesanal terroso. Todos os direitos reservados.',
                    ja: '© 2026 Hobby Horsing Club。土っぽい手作り紙風のホームページ。All rights reserved.',
                    de: '© 2026 Hobby Horsing Club. Erdig gestaltete Handpapier-Startseite. Alle Rechte vorbehalten.'
                }
            }
        },
        'forum.html': {
            textNodes: {
                'forum-page-title': {
                    en: 'Community Discussion & Suggestions',
                    'zh-CN': '社区讨论与建议',
                    'zh-TW': '社群討論與建議',
                    fr: 'Discussion communautaire & suggestions',
                    es: 'Discusión comunitaria y sugerencias',
                    pt: 'Discussão da comunidade e sugestões',
                    ja: 'コミュニティのディスカッションと提案',
                    de: 'Community-Diskussion & Vorschläge'
                },
                'forum-page-subtitle': {
                    en: 'Share your riding experiences, suggest improvements, or interact with other riders.',
                    'zh-CN': '分享你的骑乘经验、提出改进建议，或与其他骑手交流。',
                    'zh-TW': '分享你的騎乘經驗、提出改進建議，或與其他騎手交流。',
                    fr: 'Partagez vos expériences de selle, proposez des améliorations ou interagissez avec d’autres cavaliers.',
                    es: 'Comparte tus experiencias de montar, sugiere mejoras o interactúa con otros jinetes.',
                    pt: 'Compartilhe suas experiências de montaria, sugira melhorias ou interaja com outros cavaleiros.',
                    ja: '乗馬体験を共有したり、改善案を提案したり、他のライダーと交流したりしましょう。',
                    de: 'Teile deine Reiterfahrungen, schlage Verbesserungen vor oder tausche dich mit anderen Reitern aus.'
                },
                'community-message-board': {
                    en: 'Community Message Board',
                    'zh-CN': '社区留言板',
                    'zh-TW': '社群留言板',
                    fr: 'Tableau des messages de la communauté',
                    es: 'Tablón de mensajes de la comunidad',
                    pt: 'Quadro de mensagens da comunidade',
                    ja: 'コミュニティメッセージボード',
                    de: 'Community-Messageboard'
                },
                'forum-post-1-author': {
                    en: 'Rider @Forest_Rider:',
                    'zh-CN': '骑手 @Forest_Rider：',
                    'zh-TW': '騎手 @Forest_Rider：',
                    fr: 'Cavalier @Forest_Rider :',
                    es: 'Jinete @Forest_Rider:',
                    pt: 'Cavaleiro @Forest_Rider:',
                    ja: 'ライダー @Forest_Rider：',
                    de: 'Reiter @Forest_Rider:'
                },
                'forum-post-1-text': {
                    en: '"I suggest adding a night-time fluorescent hobby horse track to next month\'s obstacle camp. What do you guys think?"',
                    'zh-CN': '“我建议在下月的障碍训练营中加入夜间荧光热血跑道。大家觉得怎么样？”',
                    'zh-TW': '「我建議在下月的障礙訓練營中加入夜間螢光熱血跑道。大家覺得怎麼樣？」',
                    fr: '« Je suggère d’ajouter une piste de hobby horse fluorescente la nuit au prochain camp d’obstacles. Qu’en pensez-vous ? »',
                    es: '« Sugiero añadir una pista fluorescente para hobby horse por la noche al campamento de obstáculos del próximo mes. ¿Qué opinan? »',
                    pt: '« Sugiro adicionar uma pista fluorescente de hobby horse à noite ao acampamento de obstáculos do próximo mês. O que vocês acham? »',
                    ja: '「来月の障害キャンプに、夜間の蛍光ホビーホースコースを追加するのはどうでしょう？」',
                    de: '« Ich schlage vor, dem nächsten Hindernis-Camp eine nächtliche fluoreszierende Hobby-Horse-Strecke hinzuzufügen. Was denkt ihr? »'
                },
                'forum-post-1-date': {
                    en: 'Posted on 2026-09-02',
                    'zh-CN': '发表于 2026-09-02',
                    'zh-TW': '發表於 2026-09-02',
                    fr: 'Publié le 2026-09-02',
                    es: 'Publicado el 2026-09-02',
                    pt: 'Publicado em 2026-09-02',
                    ja: '2026-09-02 に投稿',
                    de: 'Veröffentlicht am 2026-09-02'
                },
                'forum-post-2-author': {
                    en: 'Rider @Wind_Galloper:',
                    'zh-CN': '骑手 @Wind_Galloper：',
                    'zh-TW': '騎手 @Wind_Galloper：',
                    fr: 'Cavalier @Wind_Galloper :',
                    es: 'Jinete @Wind_Galloper:',
                    pt: 'Cavaleiro @Wind_Galloper:',
                    ja: 'ライダー @Wind_Galloper：',
                    de: 'Reiter @Wind_Galloper:'
                },
                'forum-post-2-text': {
                    en: '"How should a beginner choose their first handmade hobby horse? Looking for recommendations!"',
                    'zh-CN': '“初学者应该如何选择第一匹手工制作的 Hobby Horse？正在寻找建议！”',
                    'zh-TW': '「初學者應該如何選擇第一匹手工製作的 Hobby Horse？正在尋找建議！」',
                    fr: '« Comment un débutant devrait-il choisir son premier hobby horse fait main ? Je cherche des recommandations ! »',
                    es: '« ¿Cómo debería un principiante elegir su primer hobby horse hecho a mano? ¡Busco recomendaciones! »',
                    pt: '« Como um iniciante deve escolher seu primeiro hobby horse feito à mão? Estou procurando recomendações! »',
                    ja: '「初心者は最初の手作りホビーホースをどう選べばいいのでしょう？おすすめを探しています！」',
                    de: '« Wie sollte ein Anfänger sein erstes handgemachtes Hobby-Horse auswählen? Ich suche Empfehlungen! »'
                },
                'forum-post-2-date': {
                    en: 'Posted on 2026-09-01',
                    'zh-CN': '发表于 2026-09-01',
                    'zh-TW': '發表於 2026-09-01',
                    fr: 'Publié le 2026-09-01',
                    es: 'Publicado el 2026-09-01',
                    pt: 'Publicado em 2026-09-01',
                    ja: '2026-09-01 に投稿',
                    de: 'Veröffentlicht am 2026-09-01'
                },
                'share-suggestions': {
                    en: 'Share Your Suggestions',
                    'zh-CN': '分享你的建议',
                    'zh-TW': '分享你的建議',
                    fr: 'Partagez vos suggestions',
                    es: 'Comparte tus sugerencias',
                    pt: 'Compartilhe suas sugestões',
                    ja: '提案を共有',
                    de: 'Teile deine Vorschläge'
                },
                'nickname-label': {
                    en: 'Nickname:',
                    'zh-CN': '昵称：',
                    'zh-TW': '暱稱：',
                    fr: 'Pseudo :',
                    es: 'Apodo:',
                    pt: 'Apelido:',
                    ja: 'ニックネーム：',
                    de: 'Spitzname:'
                },
                'nickname-placeholder': {
                    en: 'Enter your rider handle',
                    'zh-CN': '输入你的骑手昵称',
                    'zh-TW': '輸入你的騎手暱稱',
                    fr: 'Entrez votre pseudo',
                    es: 'Ingresa tu apodo',
                    pt: 'Digite seu apelido',
                    ja: 'ライダー名を入力',
                    de: 'Gib deinen Reiternamen ein'
                },
                'category-label': {
                    en: 'Category:',
                    'zh-CN': '分类：',
                    'zh-TW': '分類：',
                    fr: 'Catégorie :',
                    es: 'Categoría:',
                    pt: 'Categoria:',
                    ja: 'カテゴリー：',
                    de: 'Kategorie:'
                },
                'category-option-1': {
                    en: 'Training Experience',
                    'zh-CN': '训练经验',
                    'zh-TW': '訓練經驗',
                    fr: 'Expérience d’entraînement',
                    es: 'Experiencia de entrenamiento',
                    pt: 'Experiência de treino',
                    ja: 'トレーニング体験',
                    de: 'Trainingserfahrung'
                },
                'category-option-2': {
                    en: 'Equipment Suggestions',
                    'zh-CN': '装备建议',
                    'zh-TW': '裝備建議',
                    fr: 'Suggestions d’équipement',
                    es: 'Sugerencias de equipo',
                    pt: 'Sugestões de equipamento',
                    ja: '装備の提案',
                    de: 'Ausrüstungsvorschläge'
                },
                'category-option-3': {
                    en: 'Event Ideas',
                    'zh-CN': '活动创意',
                    'zh-TW': '活動創意',
                    fr: 'Idées d’événements',
                    es: 'Ideas para eventos',
                    pt: 'Ideias de eventos',
                    ja: 'イベントアイデア',
                    de: 'Event-Ideen'
                },
                'category-option-4': {
                    en: 'Other Feedback',
                    'zh-CN': '其他反馈',
                    'zh-TW': '其他回饋',
                    fr: 'Autres commentaires',
                    es: 'Otros comentarios',
                    pt: 'Outros comentários',
                    ja: 'その他のフィードバック',
                    de: 'Anderes Feedback'
                },
                'message-label': {
                    en: 'Content:',
                    'zh-CN': '内容：',
                    'zh-TW': '內容：',
                    fr: 'Contenu :',
                    es: 'Contenido:',
                    pt: 'Conteúdo:',
                    ja: '内容：',
                    de: 'Inhalt:'
                },
                'message-placeholder': {
                    en: 'Enter your feedback here...',
                    'zh-CN': '在这里输入你的反馈...',
                    'zh-TW': '在這裡輸入你的回饋...',
                    fr: 'Entrez votre avis ici...',
                    es: 'Escribe tu comentario aquí...',
                    pt: 'Digite seu feedback aqui...',
                    ja: 'ここにフィードバックを入力...',
                    de: 'Gib dein Feedback hier ein...'
                },
                'submit-post': {
                    en: 'Submit Post',
                    'zh-CN': '提交帖子',
                    'zh-TW': '提交貼文',
                    fr: 'Publier',
                    es: 'Enviar publicación',
                    pt: 'Enviar postagem',
                    ja: '投稿する',
                    de: 'Beitrag senden'
                },
                'supervisor-contact': {
                    en: 'Supervisor Contact',
                    'zh-CN': '主管联系人',
                    'zh-TW': '主管聯絡人',
                    fr: 'Contact du superviseur',
                    es: 'Contacto del supervisor',
                    pt: 'Contato do supervisor',
                    ja: '監督者連絡先',
                    de: 'Kontakt des Aufsichtsperson'
                },
                'supervisor-copy': {
                    en: 'If you encounter any issues during activities or need professional coaching, please contact our duty supervisor:',
                    'zh-CN': '如果你在活动中遇到任何问题，或需要专业指导，请联系我们的值班主管：',
                    'zh-TW': '如果你在活動中遇到任何問題，或需要專業指導，請聯絡我們的值班主管：',
                    fr: 'Si vous rencontrez des problèmes pendant les activités ou avez besoin d’un coaching professionnel, veuillez contacter notre superviseur de service :',
                    es: 'Si tienes algún problema durante las actividades o necesitas entrenamiento profesional, por favor contacta a nuestro supervisor de turno:',
                    pt: 'Se você encontrar algum problema durante as atividades ou precisar de treinamento profissional, entre em contato com nosso supervisor de plantão:',
                    ja: '活動中に問題が発生した場合や、専門的な指導が必要な場合は、当日担当の監督者までご連絡ください。',
                    de: 'Wenn du während der Aktivitäten auf Probleme stößt oder professionelle Betreuung brauchst, kontaktiere bitte unseren zuständigen Supervisor:'
                },
                'head-coach': {
                    en: 'Head Coach:',
                    'zh-CN': '主教练：',
                    'zh-TW': '主教練：',
                    fr: 'Entraîneur principal :',
                    es: 'Entrenador principal:',
                    pt: 'Treinador-chefe:',
                    ja: 'ヘッドコーチ：',
                    de: 'Leittrainer:'
                },
                'email': {
                    en: 'Email:',
                    'zh-CN': '邮箱：',
                    'zh-TW': '電子郵件：',
                    fr: 'E-mail :',
                    es: 'Correo electrónico:',
                    pt: 'E-mail:',
                    ja: 'メール：',
                    de: 'E-Mail:'
                },
                'office-hours': {
                    en: 'Office Hours:',
                    'zh-CN': '办公时间：',
                    'zh-TW': '辦公時間：',
                    fr: 'Heures d’ouverture :',
                    es: 'Horario de oficina:',
                    pt: 'Horário de atendimento:',
                    ja: '営業時間：',
                    de: 'Öffnungszeiten:'
                },
                'footer-copy': {
                    en: '© 2026 Hobby Horsing Club. Earthy handmade paper style home page. All rights reserved.',
                    'zh-CN': '© 2026 Hobby Horsing Club。手工纸质风格首页。保留所有权利。',
                    'zh-TW': '© 2026 Hobby Horsing Club。手工紙質風格首頁。保留所有權利。',
                    fr: '© 2026 Hobby Horsing Club. Style de page d’accueil en papier artisanal terreux. Tous droits réservés.',
                    es: '© 2026 Hobby Horsing Club. Estilo de página de inicio en papel artesanal terroso. Todos los derechos reservados.',
                    pt: '© 2026 Hobby Horsing Club. Estilo de página inicial em papel artesanal terroso. Todos os direitos reservados.',
                    ja: '© 2026 Hobby Horsing Club。土っぽい手作り紙風のホームページ。All rights reserved.',
                    de: '© 2026 Hobby Horsing Club. Erdig gestaltete Handpapier-Startseite. Alle Rechte vorbehalten.'
                }
            }
        },
        'history.html': {
            textNodes: {
                'history-page-title': {
                    en: 'Our Journey & Sport History',
                    'zh-CN': '我们的旅程与运动历史',
                    'zh-TW': '我們的旅程與運動歷史',
                    fr: 'Notre parcours & histoire du sport',
                    es: 'Nuestro viaje e historia deportiva',
                    pt: 'Nossa jornada e história esportiva',
                    ja: '私たちの旅とスポーツの歴史',
                    de: 'Unsere Reise & Sportgeschichte'
                },
                'history-page-subtitle': {
                    en: 'From traditional Northern European games to a global competitive sport.',
                    'zh-CN': '从传统的北欧游戏发展成为全球竞技运动。',
                    'zh-TW': '從傳統的北歐遊戲發展成為全球競技運動。',
                    fr: 'Des jeux traditionnels de l’Europe du Nord à un sport compétitif mondial.',
                    es: 'De los juegos tradicionales del norte de Europa a un deporte competitivo global.',
                    pt: 'Dos jogos tradicionais do norte da Europa a um esporte competitivo global.',
                    ja: '伝統的な北欧の遊びから、世界的な競技スポーツへ。',
                    de: 'Von traditionellen nordischen Spielen zu einer globalen Wettkampfsportart.'
                },
                'development-timeline': {
                    en: 'Development Timeline',
                    'zh-CN': '发展时间线',
                    'zh-TW': '發展時間線',
                    fr: 'Chronologie du développement',
                    es: 'Línea de tiempo del desarrollo',
                    pt: 'Linha do tempo do desenvolvimento',
                    ja: '発展のタイムライン',
                    de: 'Entwicklungszeitlinie'
                },
                'timeline-2010-title': {
                    en: '2010 - The Beginning',
                    'zh-CN': '2010 - 起步',
                    'zh-TW': '2010 - 起步',
                    fr: '2010 - Le début',
                    es: '2010 - El comienzo',
                    pt: '2010 - O início',
                    ja: '2010 - 始まり',
                    de: '2010 - Der Beginn'
                },
                'timeline-2010-text': {
                    en: 'Hobby Horsing began to gain attention in Northern Europe (especially Finland) among craft enthusiasts and teenagers.',
                    'zh-CN': 'Hobby Horsing 开始在北欧（尤其是芬兰）受到手工爱好者和青少年的关注。',
                    'zh-TW': 'Hobby Horsing 開始在北歐（尤其是芬蘭）受到手工愛好者和青少年的關注。',
                    fr: 'Le Hobby Horsing a commencé à attirer l’attention en Europe du Nord (surtout en Finlande) parmi les passionnés de bricolage et les adolescents.',
                    es: 'El Hobby Horsing comenzó a ganar atención en el norte de Europa (especialmente en Finlandia) entre aficionados al bricolaje y adolescentes.',
                    pt: 'O Hobby Horsing começou a ganhar atenção na Europa do Norte (especialmente na Finlândia) entre entusiastas de artesanato e adolescentes.',
                    ja: 'Hobby Horsing は北欧（特にフィンランド）で、手工芸愛好者や十代の若者の間で注目を集め始めました。',
                    de: 'Hobby Horsing begann in Nordeuropa (vor allem in Finnland) unter Bastelenthusiasten und Teenagern Aufmerksamkeit zu erlangen.'
                },
                'timeline-2015-title': {
                    en: '2015 - Standardization',
                    'zh-CN': '2015 - 标准化',
                    'zh-TW': '2015 - 標準化',
                    fr: '2015 - Standardisation',
                    es: '2015 - Estandarización',
                    pt: '2015 - Padronização',
                    ja: '2015 - 標準化',
                    de: '2015 - Standardisierung'
                },
                'timeline-2015-text': {
                    en: 'Enthusiasts organized local gatherings, establishing standardized obstacle jumping and scoring systems.',
                    'zh-CN': '爱好者们组织了本地聚会，建立了标准化的障碍跳跃与计分体系。',
                    'zh-TW': '愛好者們組織了本地聚會，建立了標準化的障礙跳躍與計分體系。',
                    fr: 'Les passionnés ont organisé des rassemblements locaux, établissant des systèmes normalisés de saut d’obstacles et de notation.',
                    es: 'Los aficionados organizaron encuentros locales, estableciendo sistemas estandarizados de salto de obstáculos y puntuación.',
                    pt: 'Os entusiastas organizaram encontros locais, estabelecendo sistemas padronizados de salto de obstáculos e pontuação.',
                    ja: '愛好者たちは地域の集まりを組織し、障害飛越や採点の標準化を進めました。',
                    de: 'Enthusiasten organisierten lokale Treffen und etablierten standardisierte Hindernis-Sprung- und Bewertungssysteme.'
                },
                'timeline-2020-title': {
                    en: '2020 - Club Foundation',
                    'zh-CN': '2020 - 俱乐部成立',
                    'zh-TW': '2020 - 俱樂部成立',
                    fr: '2020 - Fondation du club',
                    es: '2020 - Fundación del club',
                    pt: '2020 - Fundação do clube',
                    ja: '2020 - クラブ設立',
                    de: '2020 - Gründung des Clubs'
                },
                'timeline-2020-text': {
                    en: 'Our club was officially founded, combining digital platforms with physical training bases to provide professional guidance.',
                    'zh-CN': '我们的俱乐部正式成立，结合数字平台与实体训练基地，为广大学员提供专业指导。',
                    'zh-TW': '我們的俱樂部正式成立，結合數位平台與實體訓練基地，為廣大學員提供專業指導。',
                    fr: 'Notre club a été officiellement fondé, combinant plateformes numériques et bases d’entraînement physiques pour offrir une guidance professionnelle.',
                    es: 'Nuestro club fue fundado oficialmente, combinando plataformas digitales con bases de entrenamiento físicas para ofrecer orientación profesional.',
                    pt: 'Nosso clube foi oficialmente fundado, combinando plataformas digitais com bases de treinamento físicas para oferecer orientação profissional.',
                    ja: '私たちのクラブは正式に設立され、デジタルプラットフォームと実体のトレーニング拠点を組み合わせて、専門的な指導を提供しました。',
                    de: 'Unser Club wurde offiziell gegründet und kombiniert digitale Plattformen mit physischen Trainingsbasen, um professionelle Betreuung zu bieten.'
                },
                'timeline-2026-title': {
                    en: '2026 - Global Reach',
                    'zh-CN': '2026 - 全球影响',
                    'zh-TW': '2026 - 全球影響',
                    fr: '2026 - Portée mondiale',
                    es: '2026 - Alcance global',
                    pt: '2026 - Alcance global',
                    ja: '2026 - 世界的な広がり',
                    de: '2026 - Globale Reichweite'
                },
                'timeline-2026-text': {
                    en: 'The sport has gone global, with multiple national and international invitationals, becoming a symbol of health and creativity.',
                    'zh-CN': '这项运动已经走向全球，多个国内外邀请赛相继举行，成为健康与创造力的象征。',
                    'zh-TW': '這項運動已經走向全球，多個國內外邀請賽相繼舉行，成為健康與創造力的象徵。',
                    fr: 'Le sport s’est mondialement développé, avec plusieurs invitationales nationales et internationales, devenant un symbole de santé et de créativité.',
                    es: 'El deporte se ha expandido a nivel mundial, con múltiples invitacionales nacionales e internacionales, convirtiéndose en un símbolo de salud y creatividad.',
                    pt: 'O esporte se expandiu globalmente, com vários eventos nacionais e internacionais, tornando-se um símbolo de saúde e criatividade.',
                    ja: 'このスポーツは世界へ広がり、国内外の招待大会が相次ぎ、健康と創造性の象徴となっています。',
                    de: 'Der Sport hat sich global verbreitet, mit mehreren nationalen und internationalen Einladungsturnieren, und ist zu einem Symbol für Gesundheit und Kreativität geworden.'
                },
                'heritage-title': {
                    en: 'Craftsmanship & Heritage',
                    'zh-CN': '工艺与传承',
                    'zh-TW': '工藝與傳承',
                    fr: 'Artisanat & héritage',
                    es: 'Artesanía y patrimonio',
                    pt: 'Artesanato e patrimônio',
                    ja: '工芸と伝統',
                    de: 'Handwerk & Tradition'
                },
                'heritage-copy': {
                    en: 'Every hobby horse carries the craftsmanship of the maker and the unique personality of the rider. We believe the combination of physical materials and passionate sports brings people back to nature.',
                    'zh-CN': '每一匹 Hobby Horse 都承载着制作者的工艺与骑手的独特个性。我们相信，物质与热爱结合，能够让人重新回到自然。',
                    'zh-TW': '每一匹 Hobby Horse 都承載著製作者的工藝與騎手的獨特個性。我們相信，物質與熱愛結合，能讓人重新回到自然。',
                    fr: 'Chaque hobby horse porte l’artisanat de son créateur et la personnalité unique de son cavalier. Nous croyons que la combinaison de matériaux physiques et d’un sport passionné ramène les gens à la nature.',
                    es: 'Cada hobby horse lleva la artesanía de su creador y la personalidad única del jinete. Creemos que la combinación de materiales físicos y un deporte apasionado devuelve a la gente a la naturaleza.',
                    pt: 'Cada hobby horse carrega a arte do fabricante e a personalidade única do cavaleiro. Acreditamos que a combinação de materiais físicos e um esporte apaixonado traz as pessoas de volta à natureza.',
                    ja: 'すべてのホビーホースには、その作り手の技とライダーの個性が宿っています。私たちは、物質的な素材と情熱的なスポーツの融合が、人々を自然へと戻してくれると信じています。',
                    de: 'Jedes Hobby-Horse trägt das Handwerk des Herstellers und die einzigartige Persönlichkeit des Reiters in sich. Wir glauben, dass die Verbindung von physischen Materialien und leidenschaftlichem Sport die Menschen wieder zurück zur Natur führt.'
                },
                'footer-copy': {
                    en: '© 2026 Hobby Horsing Club. Earthy handmade paper style home page. All rights reserved.',
                    'zh-CN': '© 2026 Hobby Horsing Club。手工纸质风格首页。保留所有权利。',
                    'zh-TW': '© 2026 Hobby Horsing Club。手工紙質風格首頁。保留所有權利。',
                    fr: '© 2026 Hobby Horsing Club. Style de page d’accueil en papier artisanal terreux. Tous droits réservés.',
                    es: '© 2026 Hobby Horsing Club. Estilo de página de inicio en papel artesanal terroso. Todos los derechos reservados.',
                    pt: '© 2026 Hobby Horsing Club. Estilo de página inicial em papel artesanal terroso. Todos os direitos reservados.',
                    ja: '© 2026 Hobby Horsing Club。土っぽい手作り紙風のホームページ。All rights reserved.',
                    de: '© 2026 Hobby Horsing Club. Erdig gestaltete Handpapier-Startseite. Alle Rechte vorbehalten.'
                }
            }
        },
        'news.html': {
            textNodes: {
                'news-page-title': {
                    en: 'Latest News',
                    'zh-CN': '最新消息',
                    'zh-TW': '最新消息',
                    fr: 'Actualités',
                    es: 'Últimas noticias',
                    pt: 'Últimas notícias',
                    ja: '最新ニュース',
                    de: 'Neuigkeiten'
                },
                'news-page-subtitle': {
                    en: 'Stay updated with official announcements, event reports, and training camp info.',
                    'zh-CN': '及时了解官方公告、赛事报道与训练营信息。',
                    'zh-TW': '即時了解官方公告、賽事報導與訓練營資訊。',
                    fr: 'Restez informé des annonces officielles, des comptes-rendus d’événements et des informations sur les camps d’entraînement.',
                    es: 'Mantente al día con anuncios oficiales, informes de eventos e información del campamento de entrenamiento.',
                    pt: 'Fique atualizado com anúncios oficiais, relatórios de eventos e informações do campo de treinamento.',
                    ja: '公式発表、イベントレポート、トレーニングキャンプの情報をお見逃しなく。',
                    de: 'Bleibe auf dem Laufenden mit offiziellen Ankündigungen, Eventberichten und Informationen zum Trainingslager.'
                },
                'announcement-label': {
                    en: 'Announcement · 2026-09-01',
                    'zh-CN': '公告 · 2026-09-01',
                    'zh-TW': '公告 · 2026-09-01',
                    fr: 'Annonce · 2026-09-01',
                    es: 'Anuncio · 2026-09-01',
                    pt: 'Anúncio · 2026-09-01',
                    ja: 'お知らせ · 2026-09-01',
                    de: 'Ankündigung · 2026-09-01'
                },
                'announcement-title': {
                    en: 'Fall Obstacle Championship Prep Started',
                    'zh-CN': '秋季障碍冠军赛筹备启动',
                    'zh-TW': '秋季障礙冠軍賽籌備啟動',
                    fr: 'La préparation du championnat d’obstacles d’automne a commencé',
                    es: 'Comenzó la preparación del Campeonato de Obstáculos de Otoño',
                    pt: 'A preparação do Campeonato de Obstáculos de Outono começou',
                    ja: '秋の障害選手権準備が始まりました',
                    de: 'Vorbereitung für die Herbst-Obstacle-Meisterschaft gestartet'
                },
                'announcement-copy': {
                    en: 'The Fall Championship will feature professional and open categories. Join with your hobby horse and compete for the golden trophy!',
                    'zh-CN': '秋季冠军赛将设专业组与公开组。带上你的 Hobby Horse 参加比赛，争夺金色奖杯！',
                    'zh-TW': '秋季冠軍賽將設專業組與公開組。帶上你的 Hobby Horse 參加比賽，爭奪金色獎盃！',
                    fr: 'Le championnat d’automne proposera des catégories professionnelles et ouvertes. Rejoignez avec votre hobby horse et tentez de remporter le trophée doré !',
                    es: 'El Campeonato de Otoño contará con categorías profesionales y abiertas. ¡Únete con tu hobby horse y compite por el trofeo dorado!',
                    pt: 'O Campeonato de Outono terá categorias profissionais e abertas. Junte-se com seu hobby horse e participe para conquistar o troféu dourado!',
                    ja: '秋の選手権にはプロカテゴリとオープンカテゴリが設けられます。ホビーホースを持って参加し、金色のトロフィーを目指しましょう！',
                    de: 'Die Herbstmeisterschaft wird professionelle und offene Kategorien umfassen. Komm mit deinem Hobby-Horse und kämpfe um die goldene Trophäe!'
                },
                'camp-label': {
                    en: 'Training Camp · 2026-08-25',
                    'zh-CN': '训练营 · 2026-08-25',
                    'zh-TW': '訓練營 · 2026-08-25',
                    fr: 'Camp d’entraînement · 2026-08-25',
                    es: 'Campamento de entrenamiento · 2026-08-25',
                    pt: 'Campo de treinamento · 2026-08-25',
                    ja: 'トレーニングキャンプ · 2026-08-25',
                    de: 'Trainingslager · 2026-08-25'
                },
                'camp-title': {
                    en: 'Beginner Crafting & Riding Workshop Success',
                    'zh-CN': '初学者手工与骑乘工作坊圆满成功',
                    'zh-TW': '初學者手工與騎乘工作坊圓滿成功',
                    fr: 'Succès de l’atelier de fabrication et de monte pour débutants',
                    es: 'Éxito del taller de elaboración y monta para principiantes',
                    pt: 'Sucesso do workshop de artesanato e montaria para iniciantes',
                    ja: '初心者向けの手芸・乗馬ワークショップが大成功',
                    de: 'Erfolgreicher Workshop für Anfänger im Handwerk und Reiten'
                },
                'camp-copy': {
                    en: 'Dozens of new students joined our workshop last weekend to sew their own horses and complete their first jump.',
                    'zh-CN': '上周末，数十名新学员加入我们的工作坊，亲手缝制自己的马匹并完成首次跳跃。',
                    'zh-TW': '上週末，數十名新學員加入我們的工作坊，親手縫製自己的馬匹並完成首次跳躍。',
                    fr: 'Des dizaines de nouveaux étudiants ont rejoint notre atelier le week-end dernier pour coudre leurs propres chevaux et réaliser leur premier saut.',
                    es: 'Docenas de nuevos estudiantes se unieron a nuestro taller el fin de semana pasado para coser sus propios caballos y completar su primer salto.',
                    pt: 'Dezenas de novos alunos participaram do nosso workshop no fim de semana passado para costurar seus próprios cavalos e completar seu primeiro salto.',
                    ja: '先週末、新しい生徒が数十人参加し、自分の馬を縫って初めてのジャンプを完成させました。',
                    de: 'Dutzende neue Studenten nahmen letztes Wochenende an unserem Workshop teil, um ihre eigenen Pferde zu nähen und ihren ersten Sprung zu absolvieren.'
                },
                'media-label': {
                    en: 'Media · 2026-08-18',
                    'zh-CN': '媒体 · 2026-08-18',
                    'zh-TW': '媒體 · 2026-08-18',
                    fr: 'Média · 2026-08-18',
                    es: 'Medios · 2026-08-18',
                    pt: 'Mídia · 2026-08-18',
                    ja: 'メディア · 2026-08-18',
                    de: 'Medien · 2026-08-18'
                },
                'media-title': {
                    en: 'Club Invited to Green Sports Culture Week',
                    'zh-CN': '俱乐部受邀参加绿色体育文化周',
                    'zh-TW': '俱樂部受邀參加綠色體育文化周',
                    fr: 'Le club invité à la Semaine de la culture sportive verte',
                    es: 'Club invitado a la Semana de la Cultura Deportiva Verde',
                    pt: 'Clube convidado para a Semana da Cultura Esportiva Verde',
                    ja: 'クラブがグリーンスポーツ文化週間に招待されました',
                    de: 'Club zur Green Sports Culture Week eingeladen'
                },
                'media-copy': {
                    en: 'Our riders showcased freestyle dressage at the Culture Week, receiving an enthusiastic response from the audience.',
                    'zh-CN': '我们的骑手在文化周上展示了自由式花样骑行，获得了观众的热烈反响。',
                    'zh-TW': '我們的騎手在文化周上展示了自由式花樣騎行，獲得了觀眾的熱烈反響。',
                    fr: 'Nos cavaliers ont présenté du dressage libre lors de la Semaine de la culture, recevant une réponse enthousiaste du public.',
                    es: 'Nuestros jinetes mostraron un dressage libre en la Semana de la Cultura, recibiendo una respuesta entusiasta del público.',
                    pt: 'Nossos cavaleiros apresentaram dressage livre na Semana da Cultura, recebendo uma resposta entusiasta do público.',
                    ja: '私たちのライダーは文化週間でフリースタイル・ドレスージュを披露し、観客から熱烈な反応を得ました。',
                    de: 'Unsere Reiter zeigten bei der Kulturwoche Freestyle-Dressur und erhielten eine begeisterte Reaktion des Publikums.'
                },
                'footer-copy': {
                    en: '© 2026 Hobby Horsing Club. Earthy handmade paper style home page. All rights reserved.',
                    'zh-CN': '© 2026 Hobby Horsing Club。手工纸质风格首页。保留所有权利。',
                    'zh-TW': '© 2026 Hobby Horsing Club。手工紙質風格首頁。保留所有權利。',
                    fr: '© 2026 Hobby Horsing Club. Style de page d’accueil en papier artisanal terreux. Tous droits réservés.',
                    es: '© 2026 Hobby Horsing Club. Estilo de página de inicio en papel artesanal terroso. Todos los derechos reservados.',
                    pt: '© 2026 Hobby Horsing Club. Estilo de página inicial em papel artesanal terroso. Todos os direitos reservados.',
                    ja: '© 2026 Hobby Horsing Club。土っぽい手作り紙風のホームページ。All rights reserved.',
                    de: '© 2026 Hobby Horsing Club. Erdig gestaltete Handpapier-Startseite. Alle Rechte vorbehalten.'
                }
            }
        },
'golden_horse.html': {
            textNodes: {
                'vote-title': {
                    en: '🏆 Vote For Horses! | Who can claim The Golden Horse?',
                    'zh-CN': '🏆 Vote For Horses! | 谁能夺得 The Golden Horse？',
                    'zh-TW': '🏆 Vote For Horses! | 誰能奪得 The Golden Horse？',
                    fr: '🏆 Vote For Horses! | Qui peut revendiquer The Golden Horse ?',
                    es: '🏆 Vote For Horses! | ¿Quién puede reclamar The Golden Horse?',
                    pt: '🏆 Vote For Horses! | Quem pode reivindicar The Golden Horse?',
                    ja: '🏆 Vote For Horses! | 誰が The Golden Horse を手にする？',
                    de: '🏆 Vote For Horses! | Wer kann The Golden Horse beanspruchen?'
                },
                'vote-subtitle': {
                    en: 'UQ is gearing up for the bamboo horse championship and the arena is buzzing. Every trot, every visual twist, and every dramatic whisper now sits in your hands. Which horse will rise above the noise and win your vote?',
                    'zh-CN': 'UQ 正在为竹马锦标赛做准备，赛场里充满了喧闹与期待。每一次踢踏、每一个视觉细节、每一声戏剧性的低语，都在你手中。哪匹马会在嘈杂之中脱颖而出，赢得你的投票？',
                    'zh-TW': 'UQ 正在為竹馬錦標賽做準備，賽場裡充滿了喧鬧與期待。每一次踢踏、每一個視覺細節、每一聲戲劇性的低語，都在你手中。哪匹馬會在嘈雜之中脫穎而出，贏得你的投票？',
                    fr: 'L’UQ se prépare pour le championnat de chevaux en bambou et l’arène est en effervescence. Chaque trot, chaque détail visuel et chaque murmure dramatique repose désormais entre vos mains. Quel cheval dépassera le bruit et remportera votre vote ?',
                    es: 'La UQ se prepara para el campeonato de caballos de bambú y el escenario está lleno de ruido. Cada trote, cada giro visual y cada susurro dramático ahora está en tus manos. ¿Qué caballo superará el ruido y ganará tu voto?',
                    pt: 'A UQ está se preparando para o campeonato de cavalos de bambu e a arena está fervilhando. Cada trote, cada detalhe visual e cada sussurro dramático agora está em suas mãos. Qual cavalo vai se destacar e vencer o seu voto?',
                    ja: 'UQ は竹馬の選手権に向けて準備を進めており、会場は大いに盛り上がっています。すべてのトロット、視覚的なひねり、ドラマチックなささやきが今、あなたの手の中にあります。どの馬が騒ぎの中から抜け出し、あなたの投票を勝ち取るのでしょう？',
                    de: 'Die UQ bereitet sich auf die Bambushorn-Meisterschaft vor, und die Arena ist voller Erwartung. Jeder Trab, jede visuelle Wendung und jedes dramatische Flüstern liegt jetzt in deinen Händen. Welches Pferd wird sich über den Lärm hinwegsetzen und deine Stimme gewinnen?'
                },
                'votes-label': {
                    en: 'All votes cast:',
                    'zh-CN': '累计投票：',
                    'zh-TW': '累計投票：',
                    fr: 'Votes totaux :',
                    es: 'Votos totales:',
                    pt: 'Total de votos:',
                    ja: '総投票数：',
                    de: 'Gesamtstimmen:'
                },
                'votes-suffix': {
                    en: 'votes',
                    'zh-CN': '票',
                    'zh-TW': '票',
                    fr: 'votes',
                    es: 'votos',
                    pt: 'votos',
                    ja: '票',
                    de: 'Stimmen'
                },
                'leaderboard-title': {
                    en: 'Drama Leaderboard',
                    'zh-CN': '争议排行榜',
                    'zh-TW': '爭議排行榜',
                    fr: 'Classement du drame',
                    es: 'Clasificación del drama',
                    pt: 'Ranking do drama',
                    ja: 'ドラマランキング',
                    de: 'Drama-Rangliste'
                },
                'leaderboard-description': {
                    en: 'Live rankings update as votes roll in.',
                    'zh-CN': '投票实时更新排行榜。',
                    'zh-TW': '投票即時更新排行榜。',
                    fr: 'Les classements se mettent à jour en direct.',
                    es: 'Las clasificaciones se actualizan en vivo.',
                    pt: 'Os rankings são atualizados ao vivo.',
                    ja: '投票がリアルタイムで反映されます。',
                    de: 'Die Ranglisten werden live aktualisiert.'
                },
                'social-title': {
                    en: 'Social & Giveaway',
                    'zh-CN': '社交与赠礼',
                    'zh-TW': '社交與贈禮',
                    fr: 'Réseaux sociaux & cadeaux',
                    es: 'Social y regalo',
                    pt: 'Social e presente',
                    ja: 'SNS とプレゼント',
                    de: 'Soziale Medien & Giveaway'
                },
                'social-copy': {
                    en: 'Voting is only half the fun. Share your favorite clip on TikTok or Instagram with the tag #hobbyhorsingfunnies to enter the Golden Badge giveaway.',
                    'zh-CN': '投票只是开始。把你最喜欢的片段分享至 TikTok 或 Instagram，并标记 #hobbyhorsingfunnies，即可参与 Golden Badge 抽奖。',
                    'zh-TW': '投票只是開始。把你最喜歡的片段分享至 TikTok 或 Instagram，並標記 #hobbyhorsingfunnies，即可參與 Golden Badge 抽獎。',
                    fr: 'Voter n’est que le début. Partagez votre meilleure vidéo sur TikTok ou Instagram avec le hashtag #hobbyhorsingfunnies pour participer au tirage Golden Badge.',
                    es: 'Votar es solo la mitad de la diversión. Comparte tu mejor clip en TikTok o Instagram con la etiqueta #hobbyhorsingfunnies para entrar al sorteo de Golden Badge.',
                    pt: 'Votar é só a metade da diversão. Compartilhe seu vídeo favorito no TikTok ou Instagram com a hashtag #hobbyhorsingfunnies para entrar no sorteio do Golden Badge.',
                    ja: '投票はまだ半分です。お気に入りのクリップを TikTok または Instagram で #hobbyhorsingfunnies と一緒に共有して、Golden Badge のプレゼントに応募しましょう。',
                    de: 'Abstimmen ist nur die halbe Freude. Teile deinen Lieblingsclip auf TikTok oder Instagram mit dem Hashtag #hobbyhorsingfunnies, um am Golden Badge Giveaway teilzunehmen.'
                },
                'qr-title': {
                    en: 'QR Code',
                    'zh-CN': '二维码',
                    'zh-TW': '二維碼',
                    fr: 'Code QR',
                    es: 'Código QR',
                    pt: 'Código QR',
                    ja: 'QRコード',
                    de: 'QR-Code'
                },
                'qr-caption': {
                    en: 'Welcome to Share',
                    'zh-CN': '欢迎分享',
                    'zh-TW': '歡迎分享',
                    fr: 'Bienvenue à partager',
                    es: 'Bienvenido a compartir',
                    pt: 'Bem-vindo a compartilhar',
                    ja: '共有へようこそ',
                    de: 'Willkommen zum Teilen'
                },
                'patricia-rider-label': {
                    en: 'Rider',
                    'zh-CN': '骑手',
                    'zh-TW': '騎手',
                    fr: 'Cavalier',
                    es: 'Jinete',
                    pt: 'Cavaleiro',
                    ja: 'ライダー',
                    de: 'Reiter'
                },
                'patricia-horse-label': {
                    en: 'Horse',
                    'zh-CN': '马',
                    'zh-TW': '馬',
                    fr: 'Cheval',
                    es: 'Caballo',
                    pt: 'Cavalo',
                    ja: '馬',
                    de: 'Pferd'
                },
                'patricia-rider-name': {
                    en: 'Abby',
                    'zh-CN': 'Abby',
                    'zh-TW': 'Abby',
                    fr: 'Abby',
                    es: 'Abby',
                    pt: 'Abby',
                    ja: 'Abby',
                    de: 'Abby'
                },
                'patricia-horse-name': {
                    en: 'Patricia',
                    'zh-CN': 'Patricia',
                    'zh-TW': 'Patricia',
                    fr: 'Patricia',
                    es: 'Patricia',
                    pt: 'Patricia',
                    ja: 'Patricia',
                    de: 'Patricia'
                },
                'patricia-tag-1': {
                    en: 'Pure-blood believer',
                    'zh-CN': '纯血信徒',
                    'zh-TW': '純血信徒',
                    fr: 'Croyant du sang pur',
                    es: 'Creador de sangre pura',
                    pt: 'Crente de sangue puro',
                    ja: '純血信仰',
                    de: 'Reinerbiger Gläubiger'
                },
                'patricia-tag-2': {
                    en: 'Camera cut specialist',
                    'zh-CN': '镜头剪辑高手',
                    'zh-TW': '鏡頭剪輯高手',
                    fr: 'Spécialiste des coupes de caméra',
                    es: 'Especialista en cortes de cámara',
                    pt: 'Especialista em cortes de câmera',
                    ja: 'カメラカットのスペシャリスト',
                    de: 'Kamera-Schnitt-Spezialist'
                },
                'patricia-description': {
                    en: 'Although there was a small interruption during the obstacle test, Patricia still carries the strongest bloodline in the field.',
                    'zh-CN': '尽管在障碍测试中出现了一点小插曲，但 Patricia 依然带着赛场上最强的血统。',
                    'zh-TW': '儘管在障礙測試中出現了一點小插曲，但 Patricia 依然帶著賽場上最強的血統。',
                    fr: 'Même s’il y a eu une petite interruption pendant le test d’obstacle, Patricia porte encore la lignée la plus forte du terrain.',
                    es: 'Aunque hubo una pequeña interrupción durante la prueba de obstáculos, Patricia sigue llevando la sangre más fuerte del campo.',
                    pt: 'Embora tenha havido uma pequena interrupção durante o teste de obstáculos, Patricia ainda carrega a linhagem mais forte do campo.',
                    ja: '障害テスト中に小さな中断があったものの、Patricia は依然として会場で最も強い血統を持っています。',
                    de: 'Auch wenn es bei der Hindernisprüfung zu einer kleinen Unterbrechung kam, trägt Patricia dennoch die stärkste Blutlinie im Feld.'
                },
                'patricia-slogan': {
                    en: '“Cut the cameras! Pick us and let the chaos roll.”',
                    'zh-CN': '“关掉镜头！选我们，让混乱继续。”',
                    'zh-TW': '“關掉鏡頭！選我們，讓混亂繼續。”',
                    fr: '“Coupez les caméras ! Choisissez-nous et laissez le chaos faire son chemin.”',
                    es: '“¡Apaga las cámaras! Elige nuestra opción y deja que el caos siga.”',
                    pt: '“Cortem as câmeras! Escolham-nos e deixem o caos rolar.”',
                    ja: '“カメラを止めろ！私たちを選んで、混乱を続けさせよう。”',
                    de: '“Schaltet die Kameras aus! Wählt uns und lasst den Chaosfluss weiterlaufen.”'
                },
                'patricia-current-votes-label': {
                    en: 'Current votes',
                    'zh-CN': '当前票数',
                    'zh-TW': '目前票數',
                    fr: 'Votes actuels',
                    es: 'Votos actuales',
                    pt: 'Votos atuais',
                    ja: '現在の投票数',
                    de: 'Aktuelle Stimmen'
                },
                'rare-mane-rider-label': {
                    en: 'Rider',
                    'zh-CN': '骑手',
                    'zh-TW': '騎手',
                    fr: 'Cavalier',
                    es: 'Jinete',
                    pt: 'Cavaleiro',
                    ja: 'ライダー',
                    de: 'Reiter'
                },
                'rare-mane-horse-label': {
                    en: 'Horse',
                    'zh-CN': '马',
                    'zh-TW': '馬',
                    fr: 'Cheval',
                    es: 'Caballo',
                    pt: 'Cavalo',
                    ja: '馬',
                    de: 'Pferd'
                },
                'rare-mane-rider-name': {
                    en: 'Shaniqua',
                    'zh-CN': 'Shaniqua',
                    'zh-TW': 'Shaniqua',
                    fr: 'Shaniqua',
                    es: 'Shaniqua',
                    pt: 'Shaniqua',
                    ja: 'Shaniqua',
                    de: 'Shaniqua'
                },
                'rare-mane-horse-name': {
                    en: 'Rare Mane',
                    'zh-CN': 'Rare Mane',
                    'zh-TW': 'Rare Mane',
                    fr: 'Rare Mane',
                    es: 'Rare Mane',
                    pt: 'Rare Mane',
                    ja: 'Rare Mane',
                    de: 'Rare Mane'
                },
                'rare-mane-tag-1': {
                    en: 'Rare mane',
                    'zh-CN': '稀有鬃毛',
                    'zh-TW': '稀有鬃毛',
                    fr: 'Crinière rare',
                    es: 'Crin raro',
                    pt: 'Crina rara',
                    ja: '珍しいたてがみ',
                    de: 'Seltene Mähne'
                },
                'rare-mane-tag-2': {
                    en: 'Lens magnet',
                    'zh-CN': '镜头吸引力',
                    'zh-TW': '鏡頭吸引力',
                    fr: 'Aimant à objectif',
                    es: 'Imán de lentes',
                    pt: 'Ímã da lente',
                    ja: 'レンズの磁石',
                    de: 'Linsenmagnet'
                },
                'rare-mane-description': {
                    en: 'This is the rarest mane color in the entire tournament, and it may be enough to outshine the rest of the field on pure visual power.',
                    'zh-CN': '这是整个锦标赛中最稀有的鬃毛颜色，凭借纯粹的视觉冲击力，它足以压过其余选手。',
                    'zh-TW': '這是整個錦標賽中最稀有的鬃毛顏色，憑藉純粹的視覺衝擊力，它足以壓過其餘選手。',
                    fr: 'C’est la plus rare couleur de crinière du tournoi, et elle pourrait suffire à surpasser le reste du terrain par pure puissance visuelle.',
                    es: 'Este es el color de crin más raro de todo el torneo, y podría ser suficiente para eclipsar al resto del campo por puro poder visual.',
                    pt: 'Esta é a cor de crina mais rara de todo o torneio, e isso pode ser suficiente para ofuscar o restante do campo por puro poder visual.',
                    ja: 'これは大会全体でもっとも珍しいたてがみの色であり、純粋な視覚的な強さで他の出場者を圧倒できるかもしれません。',
                    de: 'Dies ist die seltenste Mähnenfarbe im gesamten Turnier und könnte aus rein visueller Kraft ausreichen, um den Rest des Feldes zu überstrahlen.'
                },
                'rare-mane-slogan': {
                    en: '“Beauty is power — this mane deserves your vote.”',
                    'zh-CN': '“美即力量——这鬃毛值得你投票。”',
                    'zh-TW': '“美即力量——這鬃毛值得你投票。”',
                    fr: '“La beauté est le pouvoir — cette crinière mérite votre vote.”',
                    es: '“La belleza es poder — esta crin merece tu voto.”',
                    pt: '“Beleza é poder — esta crina merece o seu voto.”',
                    ja: '“美は力だ——このたてがみはあなたの投票に値する。”',
                    de: '“Schönheit ist Macht — diese Mähne verdient deine Stimme.”'
                },
                'rare-mane-current-votes-label': {
                    en: 'Current votes',
                    'zh-CN': '当前票数',
                    'zh-TW': '目前票數',
                    fr: 'Votes actuels',
                    es: 'Votos actuales',
                    pt: 'Votos atuais',
                    ja: '現在の投票数',
                    de: 'Aktuelle Stimmen'
                },
                'nostril-rider-label': {
                    en: 'Rider',
                    'zh-CN': '骑手',
                    'zh-TW': '騎手',
                    fr: 'Cavalier',
                    es: 'Jinete',
                    pt: 'Cavaleiro',
                    ja: 'ライダー',
                    de: 'Reiter'
                },
                'nostril-horse-label': {
                    en: 'Horse',
                    'zh-CN': '马',
                    'zh-TW': '馬',
                    fr: 'Cheval',
                    es: 'Caballo',
                    pt: 'Cavalo',
                    ja: '馬',
                    de: 'Pferd'
                },
                'nostril-rider-name': {
                    en: 'Emily',
                    'zh-CN': 'Emily',
                    'zh-TW': 'Emily',
                    fr: 'Emily',
                    es: 'Emily',
                    pt: 'Emily',
                    ja: 'Emily',
                    de: 'Emily'
                },
                'nostril-horse-name': {
                    en: 'Nostril Perfection',
                    'zh-CN': 'Nostril Perfection',
                    'zh-TW': 'Nostril Perfection',
                    fr: 'Nostril Perfection',
                    es: 'Nostril Perfection',
                    pt: 'Nostril Perfection',
                    ja: 'Nostril Perfection',
                    de: 'Nostril Perfection'
                },
                'nostril-tag-1': {
                    en: 'Perfect nostrils',
                    'zh-CN': '完美鼻孔',
                    'zh-TW': '完美鼻孔',
                    fr: 'Narines parfaites',
                    es: 'Fosas perfectas',
                    pt: 'Narinas perfeitas',
                    ja: '完璧な鼻孔',
                    de: 'Perfekte Nüstern'
                },
                'nostril-tag-2': {
                    en: 'Detail decides the win',
                    'zh-CN': '细节决定胜负',
                    'zh-TW': '細節決定勝負',
                    fr: 'Le détail décide de la victoire',
                    es: 'El detalle decide la victoria',
                    pt: 'O detalhe decide a vitória',
                    ja: '細部が勝負を決める',
                    de: 'Das Detail entscheidet den Sieg'
                },
                'nostril-description': {
                    en: 'The mane is dramatic, but the real masterpiece is the flawless nose coloring and the tiny details that make this horse unforgettable.',
                    'zh-CN': '鬃毛很戏剧化，但真正的杰作是无瑕的鼻部色彩和那些让这匹马难以忘怀的细节。',
                    'zh-TW': '鬃毛很戲劇化，但真正的傑作是無瑕的鼻部色彩和那些讓這匹馬難以忘懷的細節。',
                    fr: 'La crinière est dramatique, mais le vrai chef-d’œuvre est la coloration parfaite du museau et les détails infimes qui rendent ce cheval inoubliable.',
                    es: 'La crin es dramática, pero la verdadera obra maestra es el color perfecto de la nariz y los pequeños detalles que hacen que este caballo sea inolvidable.',
                    pt: 'A crina é dramática, mas a verdadeira obra-prima é a coloração impecável do focinho e os pequenos detalhes que tornam esse cavalo inesquecível.',
                    ja: 'たてがみはドラマチックですが、本当の傑作は、完璧な鼻の色合いと、この馬を忘れられないものにしている細部です。',
                    de: 'Die Mähne ist dramatisch, aber das wahre Meisterwerk sind die makellose Nasenfärbung und die kleinen Details, die dieses Pferd unvergesslich machen.'
                },
                'nostril-slogan': {
                    en: '“Zoom in on the nostrils — that is where the real champion lives.”',
                    'zh-CN': '“放大鼻孔——真正的冠军就在那里。”',
                    'zh-TW': '“放大鼻孔——真正的冠軍就在那裡。”',
                    fr: '“Zoom sur les narines — c’est là que vit le vrai champion.”',
                    es: '“Acércate a las fosas nasales — ahí es donde vive el verdadero campeón.”',
                    pt: '“Amplie as narinas — é aí que vive o verdadeiro campeão.”',
                    ja: '“鼻孔にズームインしよう——そこに本物のチャンピオンがいる。”',
                    de: '“Zoom in auf die Nüstern — dort lebt der echte Champion.”'
                },
                'nostril-current-votes-label': {
                    en: 'Current votes',
                    'zh-CN': '当前票数',
                    'zh-TW': '目前票數',
                    fr: 'Votes actuels',
                    es: 'Votos actuales',
                    pt: 'Votos atuais',
                    ja: '現在の投票数',
                    de: 'Aktuelle Stimmen'
                },
                'mystery-rider-label': {
                    en: 'Rider',
                    'zh-CN': '骑手',
                    'zh-TW': '騎手',
                    fr: 'Cavalier',
                    es: 'Jinete',
                    pt: 'Cavaleiro',
                    ja: 'ライダー',
                    de: 'Reiter'
                },
                'mystery-horse-label': {
                    en: 'Horse',
                    'zh-CN': '马',
                    'zh-TW': '馬',
                    fr: 'Cheval',
                    es: 'Caballo',
                    pt: 'Cavalo',
                    ja: '馬',
                    de: 'Pferd'
                },
                'mystery-rider-name': {
                    en: 'Contestant 6',
                    'zh-CN': '参赛者 6',
                    'zh-TW': '參賽者 6',
                    fr: 'Candidat 6',
                    es: 'Concursante 6',
                    pt: 'Concorrente 6',
                    ja: '出場者 6',
                    de: 'Teilnehmer 6'
                },
                'mystery-horse-name': {
                    en: 'The Mystery Horse',
                    'zh-CN': 'The Mystery Horse',
                    'zh-TW': 'The Mystery Horse',
                    fr: 'The Mystery Horse',
                    es: 'The Mystery Horse',
                    pt: 'The Mystery Horse',
                    ja: 'The Mystery Horse',
                    de: 'The Mystery Horse'
                },
                'mystery-tag-1': {
                    en: 'Trot whisperer',
                    'zh-CN': '踢踏低语者',
                    'zh-TW': '踢踏低語者',
                    fr: 'Murmure du trot',
                    es: 'Susurrador de trote',
                    pt: 'Sussurrador de trote',
                    ja: 'トロットのささやき',
                    de: 'Trab-Flüsterer'
                },
                'mystery-tag-2': {
                    en: 'Mystery tactic',
                    'zh-CN': '神秘战术',
                    'zh-TW': '神秘戰術',
                    fr: 'Tactique mystérieuse',
                    es: 'Táctica misteriosa',
                    pt: 'Tática misteriosa',
                    ja: 'ミステリー戦術',
                    de: 'Geheimnisvolle Taktik'
                },
                'mystery-description': {
                    en: 'This contender does not rely on height or bravado. It is the quiet trot whispering that turns a small step into a game-changing advantage.',
                    'zh-CN': '这个选手不依赖高度或虚张声势。真正的关键在于安静的踢踏低语，它能把一个小小的步伐变成逆转局势的优势。',
                    'zh-TW': '這個選手不依賴高度或虛張聲勢。真正的關鍵在於安靜的踢踏低語，它能把一個小小的步伐變成逆轉局勢的優勢。',
                    fr: 'Ce concurrent ne compte ni sur la hauteur ni sur le bluff. C’est le murmure discret du trot qui transforme un petit pas en avantage décisif.',
                    es: 'Este contendiente no depende de la altura ni del alarde. Es el susurro tranquilo del trote lo que convierte un pequeño paso en una ventaja decisiva.',
                    pt: 'Esse concorrente não depende de altura nem de bravata. É o sussurro discreto do trote que transforma um pequeno passo em uma vantagem decisiva.',
                    ja: 'この出場者は高さや見せびらかしに頼りません。小さな一歩をゲームチェンジの優位へ変えるのは、静かなトロットのささやきです。',
                    de: 'Dieser Kandidat verlässt sich nicht auf Höhe oder Bravado. Es ist das ruhige Flüstern des Trabs, das einen kleinen Schritt in einen spielverändernden Vorteil verwandelt.'
                },
                'mystery-slogan': {
                    en: '“Hear the trot whisper? Then cast your vote for the dark horse.”',
                    'zh-CN': '“听见踢踏的低语了吗？那就把票投给黑马。”',
                    'zh-TW': '“聽見踢踏的低語了嗎？那就把票投給黑馬。”',
                    fr: '“Vous entendez le murmure du trot ? Alors votez pour le cheval noir.”',
                    es: '“¿Escuchas el susurro del trote? Entonces vota por el caballo oscuro.”',
                    pt: '“Ouviu o sussurro do trote? Então vote no cavalo sombrio.”',
                    ja: '“トロットのささやきが聞こえる？なら、ダークホースに投票しよう。”',
                    de: '“Hörst du das Flüstern des Trabs? Dann gib deine Stimme dem Dark Horse.”'
                },
                'mystery-current-votes-label': {
                    en: 'Current votes',
                    'zh-CN': '当前票数',
                    'zh-TW': '目前票數',
                    fr: 'Votes actuels',
                    es: 'Votos actuales',
                    pt: 'Votos atuais',
                    ja: '現在の投票数',
                    de: 'Aktuelle Stimmen'
                }
            }
        },
        'membership.html': {
            textNodes: {
                'membership-page-title': {
                    en: 'Membership & Benefits',
                    'zh-CN': '会员与权益',
                    'zh-TW': '會員與權益',
                    fr: 'Adhésion & avantages',
                    es: 'Membresía y beneficios',
                    pt: 'Membro e benefícios',
                    ja: '会員と特典',
                    de: 'Mitgliedschaft & Vorteile'
                },
                'membership-page-subtitle': {
                    en: 'Join our family to enjoy professional training, gear customization, and priority registration.',
                    'zh-CN': '加入我们的大家庭，享受专业训练、装备定制与优先报名。',
                    'zh-TW': '加入我們的大家庭，享受專業訓練、裝備定制與優先報名。',
                    fr: 'Rejoignez notre famille pour profiter d’un entraînement professionnel, d’une personnalisation des équipements et d’une inscription prioritaire.',
                    es: 'Únete a nuestra familia para disfrutar de entrenamiento profesional, personalización de equipos y registro prioritario.',
                    pt: 'Junte-se à nossa família para aproveitar treinamento profissional, personalização de equipamentos e inscrição prioritária.',
                    ja: '私たちの家族に入り、プロフェッショナルなトレーニング、装備のカスタマイズ、優先登録を享受しましょう。',
                    de: 'Werde Teil unserer Familie und genieße professionelles Training, individuelle Ausrüstung und priorisierte Anmeldungen.'
                },
                'levels-title': {
                    en: 'Levels & Benefits',
                    'zh-CN': '等级与权益',
                    'zh-TW': '等級與權益',
                    fr: 'Niveaux & avantages',
                    es: 'Niveles y beneficios',
                    pt: 'Níveis e benefícios',
                    ja: 'レベルと特典',
                    de: 'Level & Vorteile'
                },
                'benefit-th': {
                    en: 'Benefit',
                    'zh-CN': '权益',
                    'zh-TW': '權益',
                    fr: 'Avantage',
                    es: 'Beneficio',
                    pt: 'Benefício',
                    ja: '特典',
                    de: 'Vorteil'
                },
                'standard-th': {
                    en: 'Standard (Free)',
                    'zh-CN': '标准（免费）',
                    'zh-TW': '標準（免費）',
                    fr: 'Standard (gratuit)',
                    es: 'Estándar (gratis)',
                    pt: 'Padrão (grátis)',
                    ja: '標準（無料）',
                    de: 'Standard (kostenlos)'
                },
                'pro-rider-th': {
                    en: 'Pro Rider',
                    'zh-CN': '专业骑手',
                    'zh-TW': '專業騎手',
                    fr: 'Cavalier pro',
                    es: 'Jinete profesional',
                    pt: 'Cavaleiro profissional',
                    ja: 'プロライダー',
                    de: 'Pro-Reiter'
                },
                'grand-master-th': {
                    en: 'Grand Master',
                    'zh-CN': '大师级',
                    'zh-TW': '大師級',
                    fr: 'Grand maître',
                    es: 'Gran maestro',
                    pt: 'Grande mestre',
                    ja: 'グランドマスター',
                    de: 'Großmeister'
                },
                'facility-access-row': {
                    en: 'Facility Access',
                    'zh-CN': '场地使用',
                    'zh-TW': '場地使用',
                    fr: 'Accès aux installations',
                    es: 'Acceso a instalaciones',
                    pt: 'Acesso às instalações',
                    ja: '施設利用',
                    de: 'Zugriff auf Einrichtungen'
                },
                'coaching-row': {
                    en: 'Coaching',
                    'zh-CN': '教练',
                    'zh-TW': '教練',
                    fr: 'Encadrement',
                    es: 'Entrenamiento',
                    pt: 'Treinamento',
                    ja: '指導',
                    de: 'Coaching'
                },
                'gear-discount-row': {
                    en: 'Gear Discount',
                    'zh-CN': '装备折扣',
                    'zh-TW': '裝備折扣',
                    fr: 'Réduction sur l’équipement',
                    es: 'Descuento en equipo',
                    pt: 'Desconto em equipamentos',
                    ja: '装備割引',
                    de: 'Ausrüstung Rabatt'
                },
                'tournament-entry-row': {
                    en: 'Tournament Entry',
                    'zh-CN': '赛事报名',
                    'zh-TW': '賽事報名',
                    fr: 'Participation au tournoi',
                    es: 'Inscripción al torneo',
                    pt: 'Inscrição no torneio',
                    ja: '大会エントリー',
                    de: 'Turnieranmeldung'
                },
                'new-member-registration': {
                    en: 'New Member Registration',
                    'zh-CN': '新会员注册',
                    'zh-TW': '新會員註冊',
                    fr: 'Inscription des nouveaux membres',
                    es: 'Registro de nuevos miembros',
                    pt: 'Cadastro de novos membros',
                    ja: '新規会員登録',
                    de: 'Neue Mitgliedsanmeldung'
                },
                'full-name-label': {
                    en: 'Full Name / Handle:',
                    'zh-CN': '全名 / 昵称：',
                    'zh-TW': '全名 / 暱稱：',
                    fr: 'Nom complet / pseudo :',
                    es: 'Nombre completo / apodo:',
                    pt: 'Nome completo / apelido:',
                    ja: '氏名 / ハンドル：',
                    de: 'Vollständiger Name / Handle:'
                },
                'full-name-placeholder': {
                    en: 'Enter your name',
                    'zh-CN': '输入你的名字',
                    'zh-TW': '輸入你的名字',
                    fr: 'Entrez votre nom',
                    es: 'Ingresa tu nombre',
                    pt: 'Digite seu nome',
                    ja: '名前を入力',
                    de: 'Gib deinen Namen ein'
                },
                'email-label': {
                    en: 'Email Address:',
                    'zh-CN': '电子邮箱：',
                    'zh-TW': '電子郵件：',
                    fr: 'Adresse e-mail :',
                    es: 'Correo electrónico:',
                    pt: 'Endereço de e-mail:',
                    ja: 'メールアドレス：',
                    de: 'E-Mail-Adresse:'
                },
                'email-placeholder': {
                    en: 'name@example.com',
                    'zh-CN': 'name@example.com',
                    'zh-TW': 'name@example.com',
                    fr: 'nom@example.com',
                    es: 'nombre@ejemplo.com',
                    pt: 'nome@exemplo.com',
                    ja: 'name@example.com',
                    de: 'name@example.com'
                },
                'membership-level-label': {
                    en: 'Membership Level:',
                    'zh-CN': '会员等级：',
                    'zh-TW': '會員等級：',
                    fr: 'Niveau d’adhésion :',
                    es: 'Nivel de membresía:',
                    pt: 'Nível de membro:',
                    ja: '会員レベル：',
                    de: 'Mitgliedschaftsstufe:'
                },
                'membership-option-1': {
                    en: 'Standard (Free - $0/yr)',
                    'zh-CN': '标准（免费 - $0/年）',
                    'zh-TW': '標準（免費 - $0/年）',
                    fr: 'Standard (gratuit - 0 $/an)',
                    es: 'Estándar (gratis - $0/año)',
                    pt: 'Padrão (grátis - $0/ano)',
                    ja: '標準（無料 - $0/年）',
                    de: 'Standard (kostenlos - $0/Jahr)'
                },
                'membership-option-2': {
                    en: 'Pro Rider ($50/yr)',
                    'zh-CN': '专业骑手（$50/年）',
                    'zh-TW': '專業騎手（$50/年）',
                    fr: 'Cavalier pro (50 $/an)',
                    es: 'Jinete profesional ($50/año)',
                    pt: 'Cavaleiro profissional ($50/ano)',
                    ja: 'プロライダー（$50/年）',
                    de: 'Pro-Reiter ($50/Jahr)'
                },
                'membership-option-3': {
                    en: 'Grand Master ($120/yr)',
                    'zh-CN': '大师级（$120/年）',
                    'zh-TW': '大師級（$120/年）',
                    fr: 'Grand maître (120 $/an)',
                    es: 'Gran maestro ($120/año)',
                    pt: 'Grande mestre ($120/ano)',
                    ja: 'グランドマスター（$120/年）',
                    de: 'Großmeister ($120/Jahr)'
                },
                'horse-type-label': {
                    en: 'Interested Horse Type:',
                    'zh-CN': '感兴趣的马种：',
                    'zh-TW': '感興趣的馬種：',
                    fr: 'Type de cheval recherché :',
                    es: 'Tipo de caballo de interés:',
                    pt: 'Tipo de cavalo de interesse:',
                    ja: '興味のある馬種：',
                    de: 'Interessanter Pferdetyp:'
                },
                'horse-option-1': {
                    en: 'Classic Fabric',
                    'zh-CN': '经典布艺',
                    'zh-TW': '經典布藝',
                    fr: 'Tissu classique',
                    es: 'Tela clásica',
                    pt: 'Tecido clássico',
                    ja: 'クラシック布',
                    de: 'Klassischer Stoff'
                },
                'horse-option-2': {
                    en: 'Warmblood Sport',
                    'zh-CN': '温血运动',
                    'zh-TW': '溫血運動',
                    fr: 'Sport warmblood',
                    es: 'Deporte warmblood',
                    pt: 'Esporte warmblood',
                    ja: 'ウォームブラッドスポーツ',
                    de: 'Warmblut-Sport'
                },
                'horse-option-3': {
                    en: 'Endurance Black',
                    'zh-CN': '耐力黑马',
                    'zh-TW': '耐力黑馬',
                    fr: 'Noir d’endurance',
                    es: 'Negro de resistencia',
                    pt: 'Preto de resistência',
                    ja: 'エンデュランスブラック',
                    de: 'Endurance Schwarz'
                },
                'horse-option-4': {
                    en: 'Vintage Spotted',
                    'zh-CN': '复古斑纹',
                    'zh-TW': '復古斑紋',
                    fr: 'Tacheté vintage',
                    es: 'Motif vintage',
                    pt: 'Manchado vintage',
                    ja: 'ヴィンテージ斑',
                    de: 'Vintage gefleckt'
                },
                'horse-option-5': {
                    en: 'Customized',
                    'zh-CN': '定制',
                    'zh-TW': '定制',
                    fr: 'Personnalisé',
                    es: 'Personalizado',
                    pt: 'Personalizado',
                    ja: 'カスタム',
                    de: 'Maßgeschneidert'
                },
                'rider-motto-label': {
                    en: 'Rider Motto / Declaration:',
                    'zh-CN': '骑手座右铭 / 宣言：',
                    'zh-TW': '騎手座右銘 / 宣言：',
                    fr: 'Devise / déclaration du cavalier :',
                    es: 'Lema / declaración del jinete:',
                    pt: 'Lema / declaração do cavaleiro:',
                    ja: 'ライダーのモットー / 宣言：',
                    de: 'Reiter-Motto / Erklärung:'
                },
                'rider-motto-placeholder': {
                    en: 'Share your passion for Hobby Horsing...',
                    'zh-CN': '分享你对 Hobby Horsing 的热爱...',
                    'zh-TW': '分享你對 Hobby Horsing 的熱愛...',
                    fr: 'Partagez votre passion pour le Hobby Horsing...',
                    es: 'Comparte tu pasión por Hobby Horsing...',
                    pt: 'Compartilhe sua paixão pelo Hobby Horsing...',
                    ja: 'Hobby Horsing への情熱を共有してください...',
                    de: 'Teile deine Leidenschaft für Hobby Horsing...'
                },
                'submit-application': {
                    en: 'Submit Application',
                    'zh-CN': '提交申请',
                    'zh-TW': '提交申請',
                    fr: 'Soumettre la candidature',
                    es: 'Enviar solicitud',
                    pt: 'Enviar inscrição',
                    ja: '申請を送信',
                    de: 'Bewerbung senden'
                },
                'footer-copy': {
                    en: '© 2026 Hobby Horsing Club. Earthy handmade paper style home page. All rights reserved.',
                    'zh-CN': '© 2026 Hobby Horsing Club。手工纸质风格首页。保留所有权利。',
                    'zh-TW': '© 2026 Hobby Horsing Club。手工紙質風格首頁。保留所有權利。',
                    fr: '© 2026 Hobby Horsing Club. Style de page d’accueil en papier artisanal terreux. Tous droits réservés.',
                    es: '© 2026 Hobby Horsing Club. Estilo de página de inicio en papel artesanal terroso. Todos los derechos reservados.',
                    pt: '© 2026 Hobby Horsing Club. Estilo de página inicial em papel artesanal terroso. Todos os direitos reservados.',
                    ja: '© 2026 Hobby Horsing Club。土っぽい手作り紙風のホームページ。All rights reserved.',
                    de: '© 2026 Hobby Horsing Club. Erdig gestaltete Handpapier-Startseite. Alle Rechte vorbehalten.'
                }
            }
        }
    };

    function updateNavLabels(lang) {
        const labels = navLabels[lang] || navLabels.en;

        navContainer.querySelectorAll('nav a').forEach((link) => {
            const href = link.getAttribute('href');
            if (href && labels[href]) {
                link.textContent = labels[href];
            }
        });
    }

    function applyPageTranslations(lang) {
        const translations = pageTranslations[pageKey];
        if (!translations) return;

        Object.entries(translations.textNodes).forEach(([id, textMap]) => {
            const element = document.getElementById(id);
            if (!element) return;
            const value = textMap[lang] || textMap.en;

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        });
    }

    function applyLanguage(lang) {
        const currentLang = navLabels[lang] ? lang : 'en';

        langCurrent.textContent = langNames[currentLang] || 'English';
        langOptions.forEach((option) => {
            option.classList.toggle('active', option.dataset.lang === currentLang);
        });

        updateNavLabels(currentLang);
        applyPageTranslations(currentLang);
        localStorage.setItem('hh-language', currentLang);
        document.dispatchEvent(new CustomEvent('site-language-change', {
            detail: { language: currentLang }
        }));
    }

    langToggle?.addEventListener('click', () => {
        langSwitcher.classList.toggle('open');
        langToggle.setAttribute('aria-expanded', String(langSwitcher.classList.contains('open')));
    });

    langOptions.forEach((option) => {
        option.addEventListener('click', () => {
            langSwitcher.classList.remove('open');
            langToggle.setAttribute('aria-expanded', 'false');
            applyLanguage(option.dataset.lang);
        });
    });

    const savedLang = localStorage.getItem('hh-language') || 'en';
    applyLanguage(savedLang);
});
