    // 0. MOBILE NAVIGATION DRAWER
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = mobileDrawer.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      });

      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('active');
          mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
      });
    }

    // 1. INLINE THEME ARCHITECTURE & DYNAMIC HUD CONTROLLER
    const themeDropdownBtn = document.getElementById('themeDropdownBtn');
    const themeDropdownMenu = document.getElementById('themeDropdownMenu');
    const currentThemeLabel = document.getElementById('currentThemeLabel');
    const themeDropdownItems = document.querySelectorAll('.theme-dropdown-item');

    const themeHud = document.getElementById('themeTransitionHud');
    const hudThemeCode = document.getElementById('hudThemeCode');
    const hudThemeTitle = document.getElementById('hudThemeTitle');
    const hudThemeSub = document.getElementById('hudThemeSub');

    const themeMetadata = {
      'maximalism': {
        title: 'MAXIMALISM',
        code: '[OVERRIDE // THEME_01]',
        sub: 'Retro Cyberpunk // Scanlines // Raw Contrast'
      },
      'neubrutalism': {
        title: 'NEUBRUTALISM',
        code: '[OVERRIDE // THEME_02]',
        sub: 'Memphis Pop // Vibrant Yellow // Offset Shadows'
      },
      'glassmorphism': {
        title: 'GLASSMORPHISM',
        code: '[OVERRIDE // THEME_03]',
        sub: 'Frosted Acrylic // Deep Blur // Ambient Lighting'
      },
      'neomorphism': {
        title: 'NEOMORPHISM',
        code: '[OVERRIDE // THEME_04]',
        sub: 'Soft Inner Shadows // Dual Elevation // Minimal 3D'
      },
      'claymorphism': {
        title: 'CLAYMORPHISM',
        code: '[OVERRIDE // THEME_05]',
        sub: 'Inflatable Shapes // Clay Shading // Pastel Depth'
      },
      'minimalist': {
        title: 'MINIMALIST',
        code: '[OVERRIDE // THEME_06]',
        sub: 'Swiss Editorial // Clean Grid // Monochrome'
      }
    };

    function applyTheme(themeKey, showAnimation = false) {
      const data = themeMetadata[themeKey] || {
        title: themeKey.toUpperCase(),
        code: '[SYS // SWITCH]',
        sub: 'Custom Theme Deployed'
      };

      if (showAnimation && themeHud) {
        themeHud.setAttribute('data-theme-target', themeKey);
        hudThemeCode.textContent = data.code;
        hudThemeTitle.textContent = data.title;
        hudThemeSub.textContent = data.sub;

        themeHud.classList.add('active');

        setTimeout(() => {
          document.documentElement.setAttribute('data-theme', themeKey);
          localStorage.setItem('migs_portfolio_theme', themeKey);
          updateThemeUI(themeKey);
          resizeIframeScale();
        }, 260);

        setTimeout(() => {
          themeHud.classList.remove('active');
        }, 700);
      } else {
        document.documentElement.setAttribute('data-theme', themeKey);
        localStorage.setItem('migs_portfolio_theme', themeKey);
        updateThemeUI(themeKey);
        setTimeout(resizeIframeScale, 60);
      }
    }

    function updateThemeUI(themeKey) {
      if (currentThemeLabel) {
        currentThemeLabel.textContent = `THEME: ${themeKey.toUpperCase()}`;
      }
      themeDropdownItems.forEach(item => {
        const isMatch = item.getAttribute('data-set-theme') === themeKey;
        item.classList.toggle('active', isMatch);
        const check = item.querySelector('.theme-check');
        if (check) check.textContent = isMatch ? '✓' : '';
      });
      if (themeDropdownMenu) {
        themeDropdownMenu.classList.remove('show');
      }
    }

    if (themeDropdownBtn && themeDropdownMenu) {
      themeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdownMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        themeDropdownMenu.classList.remove('show');
      });

      themeDropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetTheme = item.getAttribute('data-set-theme');
          applyTheme(targetTheme, true);
        });
      });
    }

    const savedTheme = localStorage.getItem('migs_portfolio_theme') || 'neubrutalism';
    applyTheme(savedTheme, false);

    // 2. HERO SLIDER
    const heroSlides = document.querySelectorAll('.hero-slide');
    const prevHeroBtn = document.getElementById('prevHeroSlide');
    const nextHeroBtn = document.getElementById('nextHeroSlide');
    let currentHeroSlide = 0;

    function showHeroSlide(index) {
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    if (prevHeroBtn && nextHeroBtn && heroSlides.length > 0) {
      prevHeroBtn.addEventListener('click', () => {
        currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
      });

      nextHeroBtn.addEventListener('click', () => {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
      });
    }

    // 3. LIVE SHOWCASE & SCALE RESIZER
    const flagshipProjects = [
      {
        title: "Space Gunner Survival",
        desc: "A fast-paced sci-fi roguelite built with React, TypeScript, HTML5 Canvas, and Tailwind CSS, featuring mouse-aimed combat, evolving weapons, dynamic alien waves, and epic boss battles.",
        tags: ["React", "TypeScript", "Tailwind CSS", "HTML5 Canvas"],
        url: "https://miggy728.github.io/space-gunner-survival/",
        liveUrl: "https://miggy728.github.io/space-gunner-survival/",
        repoUrl: "https://github.com/miggy728/space-gunner-survival",
        hasIframe: true,
        icon: "fa-solid fa-gamepad",
        sub: "Interactive Web Game / Roguelite"
      },
      {
        title: "Live Stream Control Engine",
        desc: "A centralized control dashboard for live OBS/vMix video switching, automated lower-third ticker generators, and multi-platform RTMP distribution.",
        tags: ["OBS Studio", "vMix", "WebSockets", "Multi-RTMP", "TypeScript"],
        url: "https://stream.migsdev.io/control",
        liveUrl: "https://example.com/stream",
        repoUrl: "https://github.com",
        hasIframe: false,
        icon: "fa-solid fa-tower-broadcast",
        sub: "Real-Time Media Pipeline"
      },
      {
        title: "Enterprise Admin & Data Suite",
        desc: "A secured administrative hub with role-based access control (RBAC), complex database indexing, dynamic data tables, and RESTful API integrations.",
        tags: ["PHP", "MySQL", "Java", "REST API", "Tailwind CSS"],
        url: "https://admin.migsdev.io/dashboard",
        liveUrl: "https://example.com/admin",
        repoUrl: "https://github.com",
        hasIframe: false,
        icon: "fa-solid fa-database",
        sub: "Database & Backend Infrastructure"
      }
    ];

    const tabButtons = document.querySelectorAll('.tab-btn');
    const projTitle = document.getElementById('projTitle');
    const projDesc = document.getElementById('projDesc');
    const projTags = document.getElementById('projTags');
    const mockUrl = document.getElementById('mockUrl');
    const projLink = document.getElementById('projLink');
    const repoLink = document.getElementById('repoLink');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const liveFrame = document.getElementById('liveFrame');
    const fallbackPreview = document.getElementById('fallbackPreview');
    const mockIcon = document.getElementById('mockIcon');
    const mockTitle = document.getElementById('mockTitle');
    const mockSub = document.getElementById('mockSub');

    function resizeIframeScale() {
      if (!iframeWrapper) return;
      const containerWidth = iframeWrapper.clientWidth;
      const containerHeight = iframeWrapper.clientHeight;
      const targetWidth = 1440;
      const targetHeight = 900;

      const scaleX = containerWidth / targetWidth;
      const scaleY = containerHeight / targetHeight;
      const scale = Math.min(scaleX, scaleY);

      liveFrame.style.transform = `scale(${scale})`;
      liveFrame.style.left = `${(containerWidth - (targetWidth * scale)) / 2}px`;
      liveFrame.style.top = `${(containerHeight - (targetHeight * scale)) / 2}px`;
    }

    window.addEventListener('resize', resizeIframeScale);

    function loadProject(index) {
      const proj = flagshipProjects[index];

      projTitle.textContent = proj.title;
      projDesc.textContent = proj.desc;
      mockUrl.textContent = proj.url;
      projLink.href = proj.liveUrl;
      repoLink.href = proj.repoUrl;

      if (proj.hasIframe && proj.liveUrl) {
        iframeWrapper.style.display = "block";
        fallbackPreview.style.display = "none";
        liveFrame.src = proj.liveUrl;
        setTimeout(resizeIframeScale, 60);
      } else {
        iframeWrapper.style.display = "none";
        fallbackPreview.style.display = "flex";
        liveFrame.src = "about:blank";
        mockIcon.className = proj.icon;
        mockTitle.textContent = proj.title.toUpperCase();
        mockSub.textContent = proj.sub;
      }

      projTags.innerHTML = '';
      proj.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'stack-tag';
        span.textContent = tag;
        projTags.appendChild(span);
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadProject(btn.getAttribute('data-index'));
      });
    });

    loadProject(0);

    // 4. GALLERY "SEE MORE" TOGGLE
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const extraProjects = document.querySelectorAll('.extra-project');
    const toggleText = document.getElementById('toggleText');
    const toggleIcon = document.getElementById('toggleIcon');
    let isExpanded = false;

    if (extraProjects.length === 0) {
      document.querySelector('.see-more-wrap').style.display = 'none';
    } else {
      toggleText.textContent = `SEE MORE PROJECTS (${extraProjects.length} MORE)`;
    }

    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      extraProjects.forEach(card => {
        card.style.display = isExpanded ? 'flex' : 'none';
      });

      if (isExpanded) {
        toggleText.textContent = 'SHOW LESS';
        toggleIcon.className = 'fa-solid fa-minus';
      } else {
        toggleText.textContent = `SEE MORE PROJECTS (${extraProjects.length} MORE)`;
        toggleIcon.className = 'fa-solid fa-plus';
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // 5. CERTIFICATE MODAL
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalMeta = document.getElementById('certModalMeta');
    const closeCertModal = document.getElementById('closeCertModal');

    certCards.forEach(card => {
      card.addEventListener('click', () => {
        certModalImg.src = card.getAttribute('data-img');
        certModalTitle.textContent = card.getAttribute('data-title');
        certModalMeta.textContent = card.getAttribute('data-no');
        certModal.classList.add('active');
      });
    });

    closeCertModal.addEventListener('click', () => {
      certModal.classList.remove('active');
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) certModal.classList.remove('active');
    });

    // 6. CHATBOT CONTROLLER
    const chatbotLauncher = document.getElementById('chatbotLauncher');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatChips = document.querySelectorAll('.chat-chip');
    const chatbotPushpin = document.querySelector('.chatbot-pushpin');

    const BACKEND_API_URL = 'http://localhost:5000/api/chat';
    const inappropriatePattern = /\b(tangina|tang\s*ina|gago|tarantado|puta|ulol|bobo|pakyu|fuck|shit|asshole|bitch|idiot)\b/i;

    chatbotLauncher.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      if (chatbotWindow.classList.contains('active')) {
        chatInput.focus();
        if (chatbotPushpin) {
          chatbotPushpin.style.animation = 'none';
          chatbotPushpin.offsetHeight;
          chatbotPushpin.style.animation = null;
        }
      }
    });

    closeChatBtn.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });

    function appendMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = `chat-msg ${sender}`;
      msg.innerHTML = text;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function localKnowledgeFallback(query) {
      const q = query.toLowerCase();

      if (q.includes('fullstack') || q.includes('full stack') || q.includes('full-stack')) {
        return "<strong>Yes, Migs is capable of Full-Stack work.</strong> Here is an honest evaluation based on his verified background:<br><br>" +
               "• <strong>Front-End Architecture:</strong> Highly proficient with React, TypeScript, Next.js, and Tailwind CSS with state management and canvas rendering (proven in <em>Space Gunner Survival</em> and his <em>Neo-Y2K Brutalist Web Kit</em>).<br>" +
               "• <strong>Back-End & Business Logic:</strong> Scripting and OOP using PHP, Java, and C++, verified with completion certificates from Udemy.<br>" +
               "• <strong>Database & APIs:</strong> Experience with SQL/MySQL relational modeling and REST API integrations.<br>" +
               "• <strong>Networking:</strong> Built real-time socket communication tools (proven in his <em>Lower-Third Engine</em>).<br><br>" +
               "<em>Honest Status:</em> While currently a BSIT undergraduate, he has verified hands-on deployments spanning both client and server domains.";
      }

      if (q.includes('frontend') || q.includes('front end') || q.includes('front-end')) {
        return "<strong>Yes, Front-End is Migs's core development strength.</strong><br>" +
               "He builds accessible, high-performance web applications using React, Next.js, TypeScript, and modern CSS/Tailwind, grounded in his academic Web Development training at STI College Rosario and active BSIT studies at PCU Manila.";
      }

      if (q.includes('system admin') || q.includes('sysadmin') || q.includes('admin')) {
        return "<strong>Yes, System Administration is his primary career objective.</strong><br>" +
               "He is pursuing a BSIT degree at PCU Manila, has certified coursework in file-upload server security (Ethical Hacking), and has extensive hands-on experience managing network sockets, broadcast pipelines, and hardware audio mixers.";
      }

      if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone') || q.includes('number')) {
        return "You can reach Migs at:<br>📧 <strong>miguelcorpuz728@gmail.com</strong><br>📱 +639943441351<br>🐙 <a href='https://github.com/miggy728' target='_blank' style='color:var(--accent-primary); font-weight:bold;'>github.com/miggy728</a>";
      }

      if (q.includes('project') || q.includes('work') || q.includes('game') || q.includes('space gunner') || q.includes('showcase')) {
        return "Key projects include:<br>• <strong>Space Gunner Survival:</strong> A sci-fi roguelite canvas game in React & TypeScript.<br>• <strong>Lower-Third Engine:</strong> Live automated broadcasting ticker for church/events via network sockets.<br>• <strong>Neo-Y2K Brutalist Web Kit:</strong> High-impact experimental UI suite.<br>• <strong>Custom IR Lab:</strong> Audio DSP cabinet impulse profiling.";
      }

      if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('tech')) {
        return "<strong>Core Stack:</strong><br>• Languages: HTML5, CSS3, JavaScript, TypeScript, C++, PHP, Java.<br>• Frameworks: React, Next.js, Vue.js, Tailwind CSS.<br>• Tools: Vite, Redux, Git/GitHub, Figma, OBS Studio, vMix.";
      }

      if (q.includes('stream') || q.includes('broadcast') || q.includes('obs') || q.includes('vmix') || q.includes('soccom')) {
        return "Migs specializes in <strong>SOCCOM Church Livestreaming & Esports Production</strong> using OBS Studio, vMix, PTZ hardware, and multi-camera audio mixing setups.";
      }

      if (q.includes('cert') || q.includes('credential') || q.includes('udemy') || q.includes('education') || q.includes('school') || q.includes('college')) {
        return "<strong>Credentials:</strong><br>• BSIT at Philippine Christian University Manila (2024–Present)<br>• SHS Web Dev Track at STI College Rosario (2022–2024)<br>• Udemy: Ethical Hacking (File Uploads), Java Fundamentals, C++ & PHP Complete.<br>• DWE Enterprises Completion Certificate.";
      }

      if (q.includes('who') || q.includes('about') || q.includes('background') || q.includes('migs') || q.includes('juan miguel')) {
        return "<strong>Juan Miguel Corpuz (Migs)</strong> is a BSIT undergraduate at Philippine Christian University Manila, specializing in Front-End Web Development, Systems Administration, and Livestream Operations.";
      }

      return "The available portfolio information does not confirm this. Please reach out to Migs directly via email at miguelcorpuz728@gmail.com.";
    }

    async function handleSend() {
      const text = chatInput.value.trim();
      if (!text) return;

      appendMessage('user', text);
      chatInput.value = '';

      if (inappropriatePattern.test(text)) {
        setTimeout(() => {
          appendMessage(
            'bot', 
            '<span style="color:var(--accent-coral); font-weight:bold;">⚠️ Inappropriate concern detected.</span> Please maintain a professional tone relevant to Migs\'s portfolio.'
          );
        }, 300);
        return;
      }

      chatInput.disabled = true;
      chatSendBtn.disabled = true;

      const loadingMsg = document.createElement('div');
      loadingMsg.className = 'chat-msg bot';
      loadingMsg.id = 'botLoadingIndicator';
      loadingMsg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing query...';
      chatMessages.appendChild(loadingMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      try {
        const res = await fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        const indicator = document.getElementById('botLoadingIndicator');
        if (indicator) indicator.remove();

        if (data && data.reply) {
          appendMessage('bot', data.reply);
        } else {
          appendMessage('bot', localKnowledgeFallback(text));
        }
      } catch (err) {
        const indicator = document.getElementById('botLoadingIndicator');
        if (indicator) indicator.remove();
        appendMessage('bot', localKnowledgeFallback(text));
      } finally {
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
      }
    }

    chatSendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    chatChips.forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.getAttribute('data-q');
        handleSend();
      });
    });

    window.addEventListener('mousemove', (e) => {
      const orbs = document.querySelectorAll('.orb');
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.5;
        orb.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
      });
    });
  