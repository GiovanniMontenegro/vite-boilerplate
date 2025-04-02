import { Button } from "antd";
import { useTranslation } from "react-i18next";


const Support = (): React.ReactElement => {
	const { t, i18n } = useTranslation();
	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("it");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center">
			<p className="text-white text-6xl">{t("home.greeting")}</p>
			Support
			<Button onClick={onTranslateButtonClick}>
				translate
			</Button>
		</div>
	);
};

export default Support