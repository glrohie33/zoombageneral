import React from 'react';

function AttributesList({attributes}) {
    return (
        <div className="sidebar-component">
            <h3>Attributes</h3>
            {
                attributes.map(attr=>
                    (<a href={`/${attr.name}`} className={'attr-list'} key={attr.id}>{attr.name}</a>
                    ))
            }
        </div>
    );
}

export default AttributesList;