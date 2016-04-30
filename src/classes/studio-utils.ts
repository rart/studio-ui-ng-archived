
export class Utils {

    private static replacements = {
        '.': '{d}'
    };

    static getComponentTemplateUrl(cmpName: string) {
        return Utils.getComponentFile(cmpName, 'html');
    }

    static getComponentFile(componentName: string, extension: string = 'html') {
        extension = extension.replace('.','');
        return `components/${componentName}/${componentName}.${extension}`;
    }

    static contains(str: string) {
        return (str.indexOf(str) !== -1);
    }

    static encodeURI(str: string) {
        let encoded = str;
        let replacements = Utils.replacements;
        for (var replacement in replacements) {
            if (replacements.hasOwnProperty(replacement)) {
                let char = replacements[replacement];
                while (StringUtils.contains(encoded, replacement)) {
                    encoded = encoded.replace(replacement, char);
                }
            }
        }
        return encodeURIComponent(encoded);
    }

    static decodeURI(str: string) {
        let encoded = decodeURIComponent(str);
        let replacements = Utils.replacements;
        for (var replacement in replacements) {
            if (replacements.hasOwnProperty(replacement)) {
                let char = replacements[replacement];
                while (StringUtils.contains(encoded, char)) {
                    encoded = encoded.replace(char, replacement);
                }
            }
        }
        return encoded;
    }
}

export class StringUtils {

    static contains(str, search) {
        return (str.indexOf(search) !== -1);
    }

}
