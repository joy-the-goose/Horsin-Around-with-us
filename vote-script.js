document.addEventListener('DOMContentLoaded', () => {
    const totalVotesElement = document.getElementById('total-votes');
    const leaderboardList = document.getElementById('leaderboard-list');
    const voteCards = [...document.querySelectorAll('.vote-card')];
    const voteButtons = [...document.querySelectorAll('.vote-btn')];
    const toast = document.getElementById('toast');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    const translations = {
        en: {
            current: 'English',
            copyLink: 'Copy Share Link',
            votesLabel: 'All votes cast:',
            votesSuffix: 'votes',
            socialCopy: 'Voting is only half the fun. Share your favorite clip on TikTok or Instagram with the tag <strong>#hobbyhorsingfunnies</strong> to enter the Golden Badge giveaway.',
            voteButtons: 'Vote',
            voted: 'Voted',
            copyToast: 'Link copied! Go share with #hobbyhorsingfunnies!',
            copyFail: 'Copy failed — please copy manually.',
            leaderboardTitle: 'Drama Leaderboard',
            leaderboardDescription: 'Live rankings update as votes roll in.',
            socialTitle: 'Social & Giveaway',
            qrTitle: 'QR Code',
            qrCaption: 'Welcome to Share',
            voteTitle: '🏆 Vote For Horses! | Who can claim The Golden Horse?',
            voteSubtitle: 'UQ is gearing up for the bamboo horse championship and the arena is buzzing. Every trot, every visual twist, and every dramatic whisper now sits in your hands. Which horse will rise above the noise and win your vote?',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        'zh-CN': {
            current: '中文（简体）',
            copyLink: '复制分享链接',
            votesLabel: '累计投票：',
            votesSuffix: '票',
            socialCopy: '投票只是开始。把你最喜欢的片段分享至 TikTok 或 Instagram，并标记 <strong>#hobbyhorsingfunnies</strong>，即可参与 Golden Badge 抽奖。',
            voteButtons: '投票',
            voted: '已投票',
            copyToast: '链接已复制！快去分享 #hobbyhorsingfunnies！',
            copyFail: '复制失败，请手动复制。',
            leaderboardTitle: '争议排行榜',
            leaderboardDescription: '投票实时更新排行榜。',
            socialTitle: '社交与赠礼',
            qrTitle: '二维码',
            qrCaption: '欢迎分享',
            voteTitle: '🏆 Vote For Horses! | 谁能夺得 Golden Horse？',
            voteSubtitle: 'UQ 正在为竹马锦标赛做准备，赛场里充满了喧闹与期待。每一次踢踏、每一个视觉细节、每一声戏剧性的低语，都在你手中。哪匹马会在嘈杂之中脱颖而出，赢得你的投票？',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        'zh-TW': {
            current: '中文（繁體）',
            copyLink: '複製分享連結',
            votesLabel: '累計投票：',
            votesSuffix: '票',
            socialCopy: '投票只是開始。把你最喜歡的片段分享至 TikTok 或 Instagram，並標記 <strong>#hobbyhorsingfunnies</strong>，即可參與 Golden Badge 抽獎。',
            voteButtons: '投票',
            voted: '已投票',
            copyToast: '連結已複製！快去分享 #hobbyhorsingfunnies！',
            copyFail: '複製失敗，請手動複製。',
            leaderboardTitle: '爭議排行榜',
            leaderboardDescription: '投票即時更新排行榜。',
            socialTitle: '社交與贈禮',
            qrTitle: '二維碼',
            qrCaption: '歡迎分享',
            voteTitle: '🏆 Vote For Horses! | 誰能奪得 Golden Horse？',
            voteSubtitle: 'UQ 正在為竹馬錦標賽做準備，賽場裡充滿了喧鬧與期待。每一次踢踏、每一個視覺細節、每一聲戲劇性的低語，都在你手中。哪匹馬會在嘈雜之中脫穎而出，贏得你的投票？',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        fr: {
            current: 'Français',
            copyLink: 'Copier le lien',
            votesLabel: 'Votes totaux :',
            votesSuffix: 'votes',
            socialCopy: 'Voter n’est que le début. Partagez votre meilleure vidéo sur TikTok ou Instagram avec le hashtag <strong>#hobbyhorsingfunnies</strong> pour participer au tirage Golden Badge.',
            voteButtons: 'Voter',
            voted: 'Voté',
            copyToast: 'Lien copié ! Partagez avec #hobbyhorsingfunnies !',
            copyFail: 'Échec de la copie — veuillez copier manuellement.',
            leaderboardTitle: 'Classement du drame',
            leaderboardDescription: 'Les classements se mettent à jour en direct.',
            socialTitle: 'Réseaux sociaux & cadeaux',
            qrTitle: 'Code QR',
            qrCaption: 'Bienvenue à partager',
            voteTitle: '🏆 Vote For Horses! | Qui peut revendiquer The Golden Horse ?',
            voteSubtitle: 'L’UQ se prépare pour le championnat de chevaux en bambou et l’arène est en effervescence. Chaque trot, chaque détail visuel et chaque murmure dramatique repose désormais entre vos mains. Quel cheval dépassera le bruit et remportera votre vote ?',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        es: {
            current: 'Español',
            copyLink: 'Copiar enlace',
            votesLabel: 'Votos totales:',
            votesSuffix: 'votos',
            socialCopy: 'Votar es solo la mitad de la diversión. Comparte tu mejor clip en TikTok o Instagram con la etiqueta <strong>#hobbyhorsingfunnies</strong> para entrar al sorteo de Golden Badge.',
            voteButtons: 'Votar',
            voted: 'Votado',
            copyToast: '¡Enlace copiado! ¡Compártelo con #hobbyhorsingfunnies!',
            copyFail: 'Error al copiar — por favor, cópialo manualmente.',
            leaderboardTitle: 'Clasificación del drama',
            leaderboardDescription: 'Las clasificaciones se actualizan en vivo.',
            socialTitle: 'Social y regalo',
            qrTitle: 'Código QR',
            qrCaption: 'Bienvenido a compartir',
            voteTitle: '🏆 Vote For Horses! | ¿Quién puede reclamar The Golden Horse?',
            voteSubtitle: 'La UQ se prepara para el campeonato de caballos de bambú y el escenario está lleno de ruido. Cada trote, cada giro visual y cada susurro dramático ahora está en tus manos. ¿Qué caballo superará el ruido y ganará tu voto?',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        pt: {
            current: 'Português',
            copyLink: 'Copiar link',
            votesLabel: 'Total de votos:',
            votesSuffix: 'votos',
            socialCopy: 'Votar é só a metade da diversão. Compartilhe seu vídeo favorito no TikTok ou Instagram com a hashtag <strong>#hobbyhorsingfunnies</strong> para entrar no sorteio do Golden Badge.',
            voteButtons: 'Votar',
            voted: 'Votado',
            copyToast: 'Link copiado! Vá compartilhar com #hobbyhorsingfunnies!',
            copyFail: 'Falha ao copiar — copie manualmente.',
            leaderboardTitle: 'Ranking do drama',
            leaderboardDescription: 'Os rankings são atualizados ao vivo.',
            socialTitle: 'Social e presente',
            qrTitle: 'Código QR',
            qrCaption: 'Bem-vindo a compartilhar',
            voteTitle: '🏆 Vote For Horses! | Quem pode reivindicar The Golden Horse?',
            voteSubtitle: 'A UQ está se preparando para o campeonato de cavalos de bambu e a arena está fervilhando. Cada trote, cada detalhe visual e cada sussurro dramático agora está em suas mãos. Qual cavalo vai se destacar e vencer o seu voto?',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        ja: {
            current: '日本語',
            copyLink: '共有リンクをコピー',
            votesLabel: '総投票数：',
            votesSuffix: '票',
            socialCopy: '投票はまだ半分です。お気に入りのクリップを TikTok または Instagram で <strong>#hobbyhorsingfunnies</strong> と一緒に共有して、Golden Badge のプレゼントに応募しましょう。',
            voteButtons: '投票',
            voted: '投票済み',
            copyToast: 'リンクをコピーしました！#hobbyhorsingfunnies で共有しましょう！',
            copyFail: 'コピーに失敗しました。手動でコピーしてください。',
            leaderboardTitle: 'ドラマランキング',
            leaderboardDescription: '投票がリアルタイムで反映されます。',
            socialTitle: 'SNS とプレゼント',
            qrTitle: 'QRコード',
            qrCaption: '共有へようこそ',
            voteTitle: '🏆 Vote For Horses! | 誰が The Golden Horse を手にする？',
            voteSubtitle: 'UQ は竹馬の選手権に向けて準備を進めており、会場は大いに盛り上がっています。すべてのトロット、視覚的なひねり、ドラマチックなささやきが今、あなたの手の中にあります。どの馬が騒ぎの中から抜け出し、あなたの投票を勝ち取るのでしょう？',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        },
        de: {
            current: 'Deutsch',
            copyLink: 'Link kopieren',
            votesLabel: 'Gesamtstimmen:',
            votesSuffix: 'Stimmen',
            socialCopy: 'Abstimmen ist nur die halbe Freude. Teile deinen Lieblingsclip auf TikTok oder Instagram mit dem Hashtag <strong>#hobbyhorsingfunnies</strong>, um am Golden Badge Giveaway teilzunehmen.',
            voteButtons: 'Abstimmen',
            voted: 'Abgestimmt',
            copyToast: 'Link kopiert! Teile ihn jetzt mit #hobbyhorsingfunnies!',
            copyFail: 'Kopieren fehlgeschlagen — bitte manuell kopieren.',
            leaderboardTitle: 'Drama-Rangliste',
            leaderboardDescription: 'Die Ranglisten werden live aktualisiert.',
            socialTitle: 'Soziale Medien & Giveaway',
            qrTitle: 'QR-Code',
            qrCaption: 'Willkommen zum Teilen',
            voteTitle: '🏆 Vote For Horses! | Wer kann The Golden Horse beanspruchen?',
            voteSubtitle: 'Die UQ bereitet sich auf die Bambushorn-Meisterschaft vor, und die Arena ist voller Erwartung. Jeder Trab, jede visuelle Wendung und jedes dramatische Flüstern liegt jetzt in deinen Händen. Welches Pferd wird sich über den Lärm hinwegsetzen und deine Stimme gewinnen?',
            cardLabels: {
                patricia: 'Patricia',
                rareMane: 'Rare Mane',
                nostril: 'Nostril Perfection',
                mystery: 'The Mystery Horse'
            }
        }
    };

    const state = {
        language: localStorage.getItem('hh-language') || 'en',
        votes: {
            patricia: 420,
            'rare-mane': 380,
            nostril: 310,
            mystery: 310,
        },
        voted: new Set(),
    };

    const formatVoteCount = (value) => new Intl.NumberFormat('en-US').format(value);

    const applyTranslations = () => {
        const t = translations[state.language];
        if (!t) return;

        document.getElementById('votes-label').textContent = t.votesLabel;
        document.getElementById('votes-suffix').textContent = t.votesSuffix;
        document.getElementById('social-copy').innerHTML = t.socialCopy;
        document.getElementById('total-votes').textContent = formatVoteCount(Object.values(state.votes).reduce((sum, count) => sum + count, 0));

        const title = document.querySelector('.vote-title');
        const subtitle = document.querySelector('.vote-subtitle');
        const socialTitle = document.querySelector('.social-card h2');
        const qrTitle = document.querySelector('.qr-card h2');
        const qrCaption = document.querySelector('.qr-caption');
        const leaderboardTitle = document.querySelector('.leaderboard-header h2');
        const leaderboardDescription = document.querySelector('.leaderboard-header p');

        if (title) title.textContent = t.voteTitle;
        if (subtitle) subtitle.textContent = t.voteSubtitle;
        if (socialTitle) socialTitle.textContent = t.socialTitle;
        if (qrTitle) qrTitle.textContent = t.qrTitle;
        if (qrCaption) qrCaption.textContent = t.qrCaption;
        if (leaderboardTitle) leaderboardTitle.textContent = t.leaderboardTitle;
        if (leaderboardDescription) leaderboardDescription.textContent = t.leaderboardDescription;

        voteButtons.forEach((button) => {
            const card = button.closest('.vote-card');
            const key = card?.dataset.key;
            const isVoted = state.voted.has(key);
            button.textContent = isVoted ? t.voted : t.voteButtons;
            button.classList.toggle('is-voted', isVoted);
        });

        if (copyLinkBtn) {
            copyLinkBtn.textContent = t.copyLink || 'Copy Share Link';
        }
    };

    const updateTotals = () => {
        const totalVotes = Object.values(state.votes).reduce((sum, count) => sum + count, 0);

        if (totalVotesElement) {
            totalVotesElement.textContent = formatVoteCount(totalVotes);
        }

        const rankedEntries = voteCards
            .map((card) => {
                const key = card.dataset.key;
                const currentVotes = state.votes[key] || 0;
                return {
                    card,
                    key,
                    currentVotes,
                };
            })
            .sort((a, b) => b.currentVotes - a.currentVotes);

        rankedEntries.forEach((entry, index) => {
            const voteCount = entry.card.querySelector('.vote-count');
            if (voteCount) {
                voteCount.textContent = formatVoteCount(entry.currentVotes);
            }

            const ratio = totalVotes > 0 ? (entry.currentVotes / totalVotes) * 100 : 0;
            const leaderboardItem = document.querySelector(`.leaderboard-item[data-key="${entry.key}"]`);

            if (leaderboardItem) {
                leaderboardItem.querySelector('.leaderboard-rank').textContent = `#${index + 1}`;
                leaderboardItem.querySelector('.leaderboard-name').textContent = entry.card.querySelector('h2').textContent;
                leaderboardItem.querySelector('.leaderboard-percent').textContent = `${Math.round(ratio)}%`;
                leaderboardItem.querySelector('.leaderboard-fill').style.width = `${Math.max(ratio, 4)}%`;
            }
        });

        const leaderboardMarkup = rankedEntries
            .map((entry, index) => {
                const ratio = totalVotes > 0 ? (entry.currentVotes / totalVotes) * 100 : 0;
                return `
                    <li class="leaderboard-item" data-key="${entry.key}">
                        <div class="leaderboard-meta">
                            <span class="leaderboard-rank">#${index + 1}</span>
                            <span class="leaderboard-name">${entry.card.querySelector('h2').textContent}</span>
                            <span class="leaderboard-percent">${Math.round(ratio)}%</span>
                        </div>
                        <div class="leaderboard-progress">
                            <div class="leaderboard-fill" style="width: ${Math.max(ratio, 4)}%"></div>
                        </div>
                    </li>
                `;
            })
            .join('');

        if (leaderboardList) {
            leaderboardList.innerHTML = leaderboardMarkup;
        }
    };

    document.addEventListener('site-language-change', (event) => {
        const nextLanguage = event.detail?.language || state.language;
        state.language = nextLanguage;
        applyTranslations();
        updateTotals();
    });

    voteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.vote-card');
            const key = card?.dataset.key;

            if (!key || state.voted.has(key)) {
                return;
            }

            state.voted.add(key);
            state.votes[key] += 1;

            button.disabled = true;
            button.textContent = 'Voted';
            button.classList.add('is-voted');

            card.classList.add('is-selected', 'is-shaking');

            const heart = document.createElement('span');
            heart.className = 'vote-feedback';
            heart.textContent = '❤';
            card.appendChild(heart);

            setTimeout(() => {
                heart.remove();
                card.classList.remove('is-shaking');
            }, 600);

            updateTotals();
        });
    });

    copyLinkBtn?.addEventListener('click', async () => {
        const shareLink = 'https://joy-the-goose.github.io/Horsin-Around-with-us/golden_horse.html';

        try {
            await navigator.clipboard.writeText(shareLink);
            toast.textContent = translations[state.language].copyToast;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 1800);
        } catch (error) {
            toast.textContent = translations[state.language].copyFail;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 1800);
        }
    });

    applyTranslations();
    updateTotals();
});
