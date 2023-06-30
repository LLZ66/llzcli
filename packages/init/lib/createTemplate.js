import { log, makeList, makeInput, getLastestVersion } from '@llzcli/utils'


const ADD_TYPE_PAGE = 'page';
const ADD_TYPE_PROJECT = 'project';

const ADD_TEMPLATE = [
    {
        name: "vue3项目模板",
        value: "template-vue3",
        npmName: "@imooc.com/template-vue3",
        version: "1.0.1",
    },
    {
        name: "react18模板",
        value: 'template-react18',
        npmName: "@imooc.com/template-react18",
        version: "1.0.0",
    },
];

const ADD_TYPE = [
    {
        name: "项目",
        value: ADD_TYPE_PROJECT
    },
    {
        name: "页面",
        value: ADD_TYPE_PAGE
    }
];

function getAddType() {
    return makeList({
        choices: ADD_TYPE,
        message: "请选择初始化类型",
        defaultValue: ADD_TYPE_PROJECT,
    })
};

function getAddTemplate() {
    return makeList({
        choices: ADD_TEMPLATE,
        message: "请选择项目模板"
    })
};

function getAddName() {
    return makeInput({
        message: "请输入项目名称",
        defaultValue: "",
        validate(v) {
            if(!v.length) {
                return '请输入项目名称'
            }else {
                return true
            }
        }
    })
}

export default async function createTemplate(name, options) {
 // 获取创建类型
    const addType = await getAddType();
    log.info('addType', addType);
    if(addType === ADD_TYPE_PROJECT) {
        const addName = await getAddName();
        const addTemplate = await getAddTemplate();
        const selectTemplate = ADD_TEMPLATE.find(_ => _.value === addTemplate);
        const latestVersion = await getLastestVersion(selectTemplate.npmName);
        selectTemplate.version = latestVersion;
        return {
            type: addType,
            name: addName,
            template: selectTemplate,
        }
    };
}