
const next = (component, count, offset, limit) => {
    let next = null;
    let nextOffset = parseInt(offset) + parseInt(limit);
    let nextLimit = limit;
    
    if (nextOffset < parseInt(count)) {
      next = `http://localhost:3000/api/${component}?offset=${nextOffset}&limit=${nextLimit}`;
    }
    return next;
}

const previous = (component, count, offset, limit) => {
    let previous = null;
    let previousOffset = parseInt(offset) - parseInt(limit);
    let previousLimit = limit;
    
    if (parseInt(offset) > 0) {
      if (parseInt(offset) < parseInt(limit)) {
        previousOffset = 0;
        previousLimit = offset;
      }
      previous = `http://localhost:5000/api/${component}?offset=${previousOffset}&limit=${previousLimit}`;
    }
    return previous;
}



module.exports = {
    next,
    previous
}