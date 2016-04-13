export class StudioUtils {
    public static getComponentTemplateUrl(cmpName: string) {
        return StudioUtils.getComponentFile(cmpName, 'html');
    }
    public static getComponentFile(componentName: string, extension: string = 'html') {
        extension = extension.replace('.','');
        return `components/${componentName}/${componentName}.${extension}`;
    }
    public static contains(str: string) {
        return (str.indexOf(str) !== -1);
    }
}
