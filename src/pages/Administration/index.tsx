import { Button } from "antd";
import { useTranslation } from "react-i18next";


const Administration = (): React.ReactElement => {
	const { t, i18n } = useTranslation();
	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("it");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div>
			<p>{t("home.greeting")}</p>
			Administration
			<Button onClick={onTranslateButtonClick}>
				translate
			</Button>
		</div>
	);
};

export default Administration