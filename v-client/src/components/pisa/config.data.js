// sdr 测试方法配置
let identity = {
    key: 'identity',
    label: '用户identity',
    type: 'text'
}
let account = {
    key: 'account',
    label: '金额',
    type: 'number'
}
let identity_1 = {
    key: 'identity_1',
    label: '用户identity',
    type: 'text'
}
let identity_2 = {
    key: 'identity_2',
    label: '用户identity',
    type: 'text'
}
let identity_rule = {
    identity: [{
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
let identity_1_rule = {
    identity_1: [{
        required: true,
        message: '用户地址必填',
        trigger: ['blur', 'change']
    }]
}
let identity_2_rule = {
    identity_2: [{
        required: true,
        message: '用户地址必填',
        trigger: ['blur', 'change']
    }]
}
// -----------------// 
// 一个参数形式1
let param1 = [identity];
let rules1 = {
    ...identity_rule
}
// 参数形式2
let param2 = [
    identity,
    account
];
let rules2 = {
    ...identity_rule,
    ...account_rule
}
// 参数形式3
let param3 = [
    identity_1,
    identity_2,
    account
]
let rules3 = {
    ...identity_1_rule,
    ...identity_2_rule,
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
    }, {
        data: {
            name: '转账',
            value: 'transfer'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    }, {
        data: {
            name: '使用支票',
            value: 'transferFrom'
        },
        param: Object.assign([], param3),
        rules: Object.assign({}, rules3)
    }, {
        data: {
            name: '查看他人支票数量',
            value: 'allowance'
        },
        param: Object.assign([], param1),
        rules: Object.assign({}, rules1)
    }, {
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
            name: '自动清分',
            value: 'settlement'
        },
        param: [],
        rules: {}
    },
    {
        data: {
            name: '手动清分',
            value: 'manualSettlement'
        },
        param: [
            account
        ],
        rules: {
            ...account_rule
        }
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