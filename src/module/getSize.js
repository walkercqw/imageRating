/**
 * 文件大小
 */
export default (_size) => {
    if(_size <= 1024){
        return _size + 'KB';
    }else if(_size < 1048576){
        return parseFloat(_size / 1024).toFixed(2) + 'MB';
    }
    else if(_size >= 1048576){
        return parseFloat(_size / 1048576).toFixed(2) + 'GB';
    }
} 

