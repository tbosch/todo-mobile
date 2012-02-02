var todoPanel = new Ext.Panel();

function addTodo() {
    todoPanel.add({
            xtype: 'checkboxfield',
            labelWidth: '80%',
            label: this.getValue()
        }
    );
    todoPanel.ownerCt.doLayout();
}

new Ext.Application({
    launch: function() {
        new Ext.Carousel(
            {
                fullscreen: true,
                items:[
                    {
                        xtype: 'panel',
                        scroll: true,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                title: 'Todos',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Save'
                                    },
                                    {
                                        xtype: 'spacer'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Settings'
                                    }
                                ]
                            }
                        ],
                        items: [
                            {
                                xtype: 'textfield',
                                placeHolder: 'enter your todo here',
                                listeners: {
                                    action: addTodo
                                }

                            },
                            todoPanel
                        ]
                    },
                    {
                        xtype: 'panel',
                        scroll: true,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                title: 'Settings'
                            }
                        ]
                    }
                ]
            }
        );
    }
});