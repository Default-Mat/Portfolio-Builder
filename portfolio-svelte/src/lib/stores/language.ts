import { writable, get } from 'svelte/store';

export type Language = 'en' | 'fa';

// Language store
export const currentLanguage = writable<Language>('en');

// Translations
export const translations = {
  en: {
    hero: {
      icon: 'MM',  
      title: 'Matin Meskinnavaz',
      subtitle: 'Full Stack Developer',
      description: 'Passionate developer with 1+ years of experience creating modern web applications. I specialize in Node.js, Python, and MySQL, delivering scalable solutions that make a difference.'
    },
    skills: {
      title: 'My Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      devops: 'DevOps',
      frontendDesc: 'Svelte, TypeScript, Tailwind CSS, Bootstrap, WordPress',
      backendDesc: 'Node.js, Python, PHP, MySQL, SQLite',
      devopsDesc: 'AWS, Docker, CI/CD, Git, Linux'
    },
    projects: {
      title: 'My Projects',
      viewDetails: 'View Details',
      liveDemo: 'Live Demo',
      loading: 'Loading projects...'
    },
    footer: {
      title: 'Get In Touch',
      description: "I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to collaborate!",
      contactMe: 'Contact Me',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      copyright: '© 2024 Matin Meskinnavaz. All rights reserved.'
    }
  },
  fa: {
    hero: {
      icon: 'م‌م',  
      title: 'متین مسکین‌نواز',
      subtitle: 'توسعه‌دهنده فول‌استک',
      description: 'توسعه‌دهنده پرشور با بیش از ۱ سال تجربه در ایجاد برنامه‌های وب مدرن. من در Node.js، Python و MySQL تخصص دارم و راه‌حل‌های مقیاس‌پذیری ارائه می‌دهم که تفاوت ایجاد می‌کنند.'
    },
    skills: {
      title: 'مهارت‌های من',
      frontend: 'فرانت‌اند',
      backend: 'بک‌اند',
      devops: 'دوآپس',
      frontendDesc: 'Svelte، TypeScript، Tailwind CSS، Bootstrap، WordPress',
      backendDesc: 'Node.js، Python، PHP، MySQL، SQLite',
      devopsDesc: 'AWS، Docker، CI/CD، Git، Linux'
    },
    projects: {
      title: 'پروژه‌های من',
      viewDetails: 'مشاهده جزئیات',
      liveDemo: 'نمایش زنده',
      loading: 'در حال بارگذاری پروژه‌ها...'
    },
    footer: {
      title: 'ارتباط با من',
      description: 'من همیشه به فرصت‌های جدید و پروژه‌های هیجان‌انگیز علاقه‌مندم. در صورت تمایل به همکاری، با من تماس بگیرید!',
      contactMe: 'تماس با من',
      linkedin: 'لینکدین',
      github: 'گیت‌هاب',
      copyright: '© ۲۰۲۴ متین مسکین‌نواز. تمامی حقوق محفوظ است.'
    }
  }
};

// Helper function to get current translation
export function getTranslation(key: string): string {
  const lang = get(currentLanguage);
  
  const keys = key.split('.');
  let translation: any = translations[lang];
  
  for (const k of keys) {
    translation = translation[k];
  }
  
  return translation || key;
}

// Toggle language function
export function toggleLanguage() {
  currentLanguage.update(lang => lang === 'en' ? 'fa' : 'en');
} 