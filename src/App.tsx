import { Suspense } from "react";
import { useTranslation } from "react-i18next";


export default function App() {


  const { t } = useTranslation();


  return (
    <Suspense fallback="loading">
      <div>app {t("hello")} </div>
    </Suspense>
  );
}
