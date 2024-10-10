import React from 'react';
import { useLocale } from 'next-intl';

interface LanguageAwareTextProps {
  children: React.ReactNode;
  className?: string;
}

const LanguageAwareText: React.FC<LanguageAwareTextProps> = ({ children, className = '' }) => {
  const locale = useLocale();
  const isArabicLocale = locale === 'ar';

  const detectLanguage = (text: string) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? 'ar' : 'en';
  };

  const renderContent = (child: React.ReactNode): React.ReactNode => {
    if (typeof child === 'string') {
      const detectedLanguage = detectLanguage(child);
      return (
        <span 
          className={`${className} ${detectedLanguage === 'ar' ? 'font-arabic' : 'font-jakarta'}`}
          dir={detectedLanguage === 'ar' ? 'rtl' : 'ltr'}
        >
          {child}
        </span>
      );
    } else if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        children: React.Children.map(child.props.children, renderContent),
      });
    } else if (Array.isArray(child)) {
      return child.map((nestedChild, index) => (
        <React.Fragment key={index}>{renderContent(nestedChild)}</React.Fragment>
      ));
    }
    return child;
  };

  return <>{renderContent(children)}</>;
};

export default LanguageAwareText;