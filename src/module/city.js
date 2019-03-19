import {city} from '../service/getData'
import {setStore,getStore,removeStore} from './store'
import {getDate,formatDate} from './date'

export class City {
    constructor (parameter = '330000',level = 2) {
        this.parameter = parameter;
        this.level = level;
    }

    /**
     * 获取地址数据
     */
    async getCityDate() {
        let addrData = getStore('cityDate');
        if(addrData){
            addrData = JSON.parse(addrData);
            //数据过期，重新获取
            if(getDate(addrData.syncTime).getTime() < new Date().getTime() - 86400000){
                removeStore('cityDate');
                this.getCityDate();
                return;
            }

            return addrData;
        }else{
            addrData = await city();
            addrData.syncTime = formatDate();
            setStore('cityDate',addrData);
            return addrData;
        }
    }
    /**
     * 根据生成好的地址对象组合地址
     */
    formatAddr(_obj) {
        switch(_obj.level){
                case 1:
                    _obj.addr = _obj.province;break;
                case 2:
                    _obj.addr = _obj.province === _obj.city ? _obj.city : _obj.province + ' ' +_obj.city;break;
                case 3:
                    _obj.addr = _obj.province === _obj.city ? _obj.city + ' ' + _obj.area : _obj.province + ' ' +_obj.city + ' ' + _obj.area;break;
            }
        return _obj;
    }
    /**
     * 通过 code 获取地址对象
     */
    codeToAddr(_code){
        let that = this,
            _pCode = String(_code).substr(0,2).padEnd(6, '0'),
            _cCode = String(_code).substr(0,4).padEnd(6, '0'),
            level = 0,
            _p = this.addrData.p[_pCode].n || '',
            _c = this.addrData.p[_pCode].c[_cCode] ? this.addrData.p[_pCode].c[_cCode].n : '',
            _a = this.addrData.p[_pCode].c[_cCode] && this.addrData.p[_pCode].c[_cCode].a[_code] ? this.addrData.p[_pCode].c[_cCode].a[_code].n : '';

        level = _p ? ++level : level;
        level = _c ? ++level : level;
        level = _a ? ++level : level;
        return {
            code: _code,
            province: _p,
            city: _c,
            area: _a,
            level: that.level,
            addr: ''
        }
    }
    /**
     * 通过 文字 获取地址对象
     */
    addrToAddr(_addr) {
        let that = this,
            _p = _c = _a = _code = '',
            level=0;

        for(_pCode in this.addrData.p){
            if(_addr.indexOf(this.addrData.p[_pCode].n) > -1){
                var _province = this.addrData.p[_pCode];
                _code = _pCode;
                _p = _province.n;
                _addr = _addr.substring(_p.length);
                ++level;
                for(_cCode in _province.c){
                    if(_addr.indexOf(_province.c[_cCode].n) > -1){
                        var _city = _province.c[_cCode];
                        _code = _cCode;
                        _c = _city.n;
                        _addr = _addr.substring(_c.length);
                        ++level;
                        for(_aCode in _city.a){
                            if(_addr.indexOf(_city.a[_aCode].n) > -1){
                                _code = _aCode;
                                _a = _city.a[_aCode].n;
                                ++level;
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        return {
            code: _code,
            province: _p,
            city: _c,
            area: _a,
            level: that.level,
            addr: ''
        }
    }
    /**
     * 返回地址对象
     */
    async getAddr() {
        this.addrData = await this.getCityDate();
        if(/^\d{6}$/.test(this.parameter)){
            return {'msg':'SUCCESS','data':this.formatAddr(this.codeToAddr(this.parameter))};
        }else if(this.parameter){
            return {'msg':'SUCCESS','data':this.formatAddr(this.addrToAddr(this.parameter))};
        }else{
            return {'msg':'ERROR:PARAMETER ERROR','data':this.ctiyObj};
        }
    }
};
