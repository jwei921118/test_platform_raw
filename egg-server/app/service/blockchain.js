const {
  Service
} = require('egg');
const path = require('path');
const fs = require('fs');
const basePath = '../../';
const Chain = require('@alipay/mychain/index.node');
const admin = 'contract_test';

class BlockChainService extends Service {
  /**
   *
   *
   * @param {*} hexStr
   * @returns
   * @memberof BlockChainService
   */
  hexStr2Buffer(hexStr) {
    if (hexStr.indexOf('0x') == 0) {
      hexStr = hexStr.replace('0x', '');
    }

    if (hexStr.length <= 0 || hexStr.length % 2 == 1) {
      return Buffer.alloc(0);
    }

    let buffer = Buffer.alloc(hexStr.length / 2);
    for (var i = 0; i < hexStr.length / 2; i++) {
      let hex = hexStr.substring(i * 2, i * 2 + 2);
      buffer[i] = parseInt('0x' + hex);
    }
    return buffer;
  }

  // 初始化一个区块链连接
  initChain() {
    const accountKey = fs.readFileSync(this.getPath('certs/user.pem'), {
      encoding: 'utf8'
    });
    const accountPassword = 'Kaio663*&^1231';

    const keyInfo = Chain.utils.getKeyInfo(accountKey, accountPassword);

    const passphrase = 'realsu.123$%^AQ';

    let opt = {
      host: '147.103.163.48', //目标区块链网络节点的 IP
      port: 18130, //端口号
      timeout: 30000, //连接超时时间配置
      clients: [
        {
          host: '106.14.168.236',
          port: 18130
        },
        {
          host: '47.103.163.178',
          port: 18130
        },
        {
          host: '47.102.11.238',
          port: 18130
        }
      ],
      cert: fs.readFileSync(this.getPath('certs/client.crt'), {
        encoding: 'utf8'
      }),
      ca: fs.readFileSync(this.getPath('certs/ca.crt'), {
        encoding: 'utf8'
      }),
      key: fs.readFileSync(this.getPath('certs/client.key'), {
        encoding: 'utf8'
      }),
      userPublicKey: keyInfo.publicKey,
      userPrivateKey: keyInfo.privateKey,
      userRecoverPublicKey: keyInfo.publicKey,
      userRecoverPrivateKey: keyInfo.privateKey,
      passphrase: passphrase
    };
    // 初始化一个连接实例
    const chain = Chain(opt);
    return chain;
  }

  /**
   * 蚂蚁区块链
   * 根据公私钥对初始化链的实例
   * @param {*} privateKeyStr
   * @param {*} publicKeyStr
   */
  async getChain(privateKeyStr, publicKeyStr) {
    if (!privateKeyStr || !publicKeyStr) {
      return false;
    }
    const privateKey = this.hexStr2Buffer(privateKeyStr);
    const publicKey = this.hexStr2Buffer(publicKeyStr);
    // const result = Chain.utils.getKeyInfo(privateKeyStr);

    let opt = {
      host: '106.15.155.192', //目标区块链网络节点的 IP
      port: 18130, //端口号
      timeout: 30000, //连接超时时间配置
      cert: fs.readFileSync(this.getPath('certs/client.crt'), {
        encoding: 'utf8'
      }),
      ca: fs.readFileSync(this.getPath('certs/ca.crt'), {
        encoding: 'utf8'
      }),
      key: fs.readFileSync(this.getPath('certs/client.key'), {
        encoding: 'utf8'
      }),
      userPublicKey: publicKey,
      userPrivateKey: privateKey,
      userRecoverPublicKey: publicKey,
      userRecoverPrivateKey: privateKey,
      passphrase: 'fsdDJFO&*(&3fkls33fg'
    };
    const chain = Chain(opt);
    return chain;
  }

  /**
   *
   * 创建区块链账户名
   * @param {*} accountName
   * @memberof BlockChainService
   */
  createAccount(accountName) {
    let {
      app
    } = this;
    let chain = null;
    if (!app.chainInstance) {
      app.chainInstance = this.initChain();
    }
    chain = app.chainInstance;

    const newKey = Chain.utils.generateECKey();

    // 合约账户名称
    const newAccountName = accountName + '_' + new Date().getTime();

    return new Promise((resolve, reject) => {
      chain.ctr.CreateAccount({
          from: admin,
          to: newAccountName,
          data: {
            recover_key: '0x' + newKey.publicKey.toString('hex'),
            auth_key: '0x' + newKey.publicKey.toString('hex'),
            auth_weight: 100
          }
        },
        (err) => {
          if (err) {
            resolve({
              status: false
            });
          } else {
            chain.ctr.QueryAccount({
                from: newAccountName
              },
              (err, user) => {
                if (err) {
                  resolve({
                    status: false
                  });
                } else {
                  let identity = user.data.identity;
                  if (identity === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                    identity = this.getHashIdentity(newAccountName)
                  }
                  resolve({
                    status: true,
                    accountName: newAccountName,
                    identity,
                    publicKey: '0x' + newKey.publicKey.toString('hex'),
                    privateKey: '0x' + newKey.privateKey.toString('hex')
                  });
                }
              }
            );
          }
        }
      );
    });
  }

  /**
   *
   *
   * @memberof BlockChainService
   */
  queryAccount(name) {

    const chain = this.initChain();
    return new Promise((resolve, reject) => {
      chain.ctr.QueryAccount({
          from: name
        },
        (err, data) => {
          if (err) {
            resolve({
              status: false
            });
          } else {
            let identity = data.data.identity;
            resolve({
              status: true,
              identity
            });
          }
        }
      );
    });
  }

  /**
   * data
   * 部署合约
   * @memberof BlockChainService
   */
  async deployContract(data, cntParam) {
    let {
      app
    } = this;
    let chain = null;
    let arr = [];
    if (cntParam) {
      arr = cntParam.split(',');
    }
    if (arr[2]) {
      arr[2] = parseInt(arr[2]);
    }
    if (arr[3]) {
      arr[3] = parseInt(arr[3]);
    }
    if (arr[4]) {
      arr[4] = parseInt(arr[4]);
    }
    // if (!app.chainInstance) {
    //   app.chainInstance = await this.getChain(data.privateKey, data.publicKey);
    //   this.setUser(app.chainInstance, data.privateKey, data.publicKey);
    // }
    if (!app.chainInstance) {
      app.chainInstance = this.initChain();
    }
    chain = app.chainInstance;
    if (!chain) {
      return {
        code: 1,
        message: '区块链错误'
      };
    }
    const abi = JSON.parse(data.abi);
    const myContract = chain.ctr.contract(data.contractName, abi);
    return new Promise((resolve, reject) => {
      myContract.new(
        data.bytecode, {
          from: data.accountName,
          parameters: arr
        },
        (err, output, data) => {
          if (err) {
            resolve({
              code: 1,
              message: '部署合约失败'
            });
          } else {
            resolve({
              code: 0,
              txhash: data.txhash,
              message: '部署合约成功'
            });
          }
          // 销毁引用
          chain = null;
        }
      );
    });
  }


  /**
   *
   * 获取合约实例
   * @param {*} data
   * @memberof BlockChainService
   */
  async getContractInstance(data) {
    let {
      app
    } = this;
    let chain = null;
    // if (!app.chainInstance) {
    //   app.chainInstance = await this.getChain(data.privateKey, data.publicKey);
    //   this.setUser(app.chainInstance, data.privateKey, data.publicKey);
    // }
    if (!app.chainInstance) {
      app.chainInstance = this.initChain();
    }
    chain = app.chainInstance;
    let abi = JSON.parse(data.abi);
    const theContract = chain.ctr.contract(data.contractName, abi);
    return theContract;
  }



  /**
   *
   * 设置用户调用者
   * @param {*} chain
   * @param {*} privateKey
   * @param {*} publicKey
   * @memberof BlockChainService
   */
  setUser(chain, privateKey, publicKey) {
    let opt = {};
    opt.userPrivateKey = privateKey;
    opt.userPublicKey = publicKey;
    opt.userRecoverPrivateKey = privateKey;
    opt.userRecoverPublicKey = publicKey;
    chain.setUserKey(opt);
    chain.setUserRecoverKey(opt);
  }
  /**
   *
   *  查询合约
   * @memberof BlockChainService
   */
  queryContract(cntName, myContract) {
    if (myContract) {
      return new Promise((resolve, reject) => {
        myContract.QueryContract({
            from: cntName
          },
          (err, data) => {
            if (err) {
              resolve({
                code: 1,
                message: '查询合约信息失败'
              });
            } else {
              resolve({
                code: 0,
                data: {
                  identity: data.identity
                }
              });
            }
          }
        );
      });
    } else {
      const chain = this.initChain();
      chain.ctr.QueryContract({
          from: cntName
        },
        (err, data) => {
          if (err) {
            resolve({
              code: 1,
              message: '查询合约信息失败'
            });
          } else {
            resolve({
              code: 0,
              data: {
                identity: data.identity
              }
            });
          }
        }
      );
    }
  }
  // 获取路径
  getPath(filepath) {
    return path.join(__dirname, basePath, filepath);
  }

  // 生成一个唯一的hash
  getHashIdentity(str) {
    return Chain.utils.getHash(str);
  }
}

module.exports = BlockChainService;