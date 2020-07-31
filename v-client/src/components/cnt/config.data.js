// sdr 测试方法配置
let addr = {
    key: 'addr',
    label: '用户addr',
    type: 'text'
}
let account = {
    key: 'account',
    label: '金额',
    type: 'number'
}
let addr_1 = {
    key: 'addr_1',
    label: '用户addr',
    type: 'text'
}
let addr_2 = {
    key: 'addr_2',
    label: '用户addr',
    type: 'text'
}
let addr_rule = {
    addr: [{
        required: true,
        message: '用户地址必填',
        trigger: ['blur', 'change']
    }]
}
let account_rule = {
    account: [{
        required: true,
        message: '金额不能为空',
        trigger: 'blur'
    }]
}
let addr_1_rule = {
    addr_1: [{
        required: true,
        message: '用户地址必填',
        trigger: ['blur', 'change']
    }]
}
let addr_2_rule = {
    addr_2: [{
        required: true,
        message: '用户地址必填',
        trigger: ['blur', 'change']
    }]
}
// -----------------// 
// 一个参数形式1
let param1 = [addr];
let rules1 = {
    ...addr_rule
}
// 参数形式2
let param2 = [
    addr,
    account
];
let rules2 = {
    ...addr_rule,
    ...account_rule
}
// 参数形式3
let param3 = [
    addr_1,
    addr_2,
    account
]
let rules3 = {
    ...addr_1_rule,
    ...addr_2_rule,
    ...account_rule
}

// sdr methods
const sdrMethodsArr = [{
        data: {
            name: '增发稳定币',
            value: 'mintAvailable'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '销毁稳定币',
            value: 'burntAvailable'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '查询账户额度',
            value: 'balanceOfAvailable'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '冻结账户稳定币',
            value: 'mintFreeze'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '销毁账户稳定币',
            value: 'burntFreeze'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '解冻账户稳定币',
            value: 'unfreeze'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '查询账户冻结金额',
            value: 'balanceOfFreeze'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '转账',
            value: 'transfer'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    },
    {
        data: {
            name: '开支票',
            value: 'approve'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '使用支票',
            value: 'transferFrom'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    },
    {
        data: {
            name: '查看他人支票数量',
            value: 'allowance'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '查看可使用支票数量',
            value: 'allowanceForSpender'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    }
]

// pisa methods

const pisaMethodsArr = [{
        data: {
            name: '添加合约人',
            value: 'addPartner'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '查询合伙人权益',
            value: 'balanceOf'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '商户成本值',
            value: 'cost'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '冻结商户成本值',
            value: 'freezeCost'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '成本比例',
            value: 'costRatio'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '固定成本',
            value: 'costFixed'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '按照固定成本清分',
            value: 'clearBycostFixed'
        },
        param: [account, {
            key: 'month',
            label: '月份',
            type: 'text'
        }],
        rules: {
            ...account_rule,
            month: [{
                required: true,
                message: '请输入月份',
                trigger: ['blur', 'change']
            }]
        }
    },
    {
        data: {
            name: '按照比例清分',
            value: 'clearBycostRatio'
        },
        param: [account],
        rules: {
            ...account_rule
        }
    },
    {
        data: {
            name: '转账',
            value: 'transfer'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    },
    {
        data: {
            name: '使用支票',
            value: 'transferFrom'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    },
    {
        data: {
            name: '切换管理员',
            value: 'changeOwner'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '查看他人支票数量',
            value: 'allowance'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: '查看可使用支票数量',
            value: 'allowanceForSpender'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    },
    {
        data: {
            name: 'pisa总数',
            value: 'totalSupply'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '当前分发总额',
            value: 'nowTotalSupply'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '合伙人数量',
            value: 'partnerSize'
        },
        param: [],
        rules: {}
    }
]

// confirm methods 

const confirmMethodsArr = [{
        data: {
            name: '添加读权限',
            value: 'addReadUser'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '添加写的权限',
            value: 'addWriteUser'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '删除读的权限',
            value: 'delRReadUser'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '删除写的权限',
            value: 'delWriteUser'
        },
        param: Object.assign([], param2),
        rules: Object.assign({}, rules2)
    },
    {
        data: {
            name: '写sass端权限',
            value: 'writeSaaSData'
        },
        param: [{
            key: 'proId',
            label: '项目Id',
            type: 'text'
        }, {
            key: 'orderId',
            label: '订单id',
            type: 'text'
        }, account],
        rules: {
            proId: [{
                required: true,
                message: '项目id必填',
                trigger: ['blur', 'change']
            }],
            orderId: [{
                required: true,
                message: '订单id必填',
                trigger: ['blur', 'change']
            }],
            ...account_rule
        }
    },
    {
        data: {
            name: '支付渠道上报订单信息',
            value: 'writePayChannelData'
        },
        param: [{
            key: 'proId',
            label: '项目Id',
            type: 'text'
        }, {
            key: 'orderId',
            label: '订单id',
            type: 'text'
        }, account],
        rules: {
            proId: [{
                required: true,
                message: '项目id必填',
                trigger: ['blur', 'change']
            }],
            orderId: [{
                required: true,
                message: '订单id必填',
                trigger: ['blur', 'change']
            }],
            ...account_rule
        }
    },
    {
        data: {
            name: '支付信息比对',
            value: 'compareData'
        },
        param: [{
            key: 'proId',
            label: '项目Id',
            type: 'text'
        }, {
            key: 'orderId',
            label: '订单id',
            type: 'text'
        }],
        rules: {
            proId: [{
                required: true,
                message: '项目id必填',
                trigger: ['blur', 'change']
            }],
            orderId: [{
                required: true,
                message: '订单id必填',
                trigger: ['blur', 'change']
            }]
        }

    }
]


export {
    sdrMethodsArr,
    pisaMethodsArr,
    confirmMethodsArr
};