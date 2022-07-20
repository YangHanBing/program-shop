export default [{
    label: '全部',
    name: 'all',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'danger',
        title: '批量删除'
      },
      {
        size: 'small',
        title: '上架'
      },
      {
        size: 'small',
        title: '下架'
      }
    ]
  },
  {
    label: '审核中',
    name: 'checking',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'danger',
        title: '批量删除'
      }
    ]
  },
  {
    label: '出售中',
    name: 'saffing',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'danger',
        title: '批量删除'
      },
      {
        size: 'small',
        title: '下架'
      }
    ]
  },
  {
    label: '已下架',
    name: 'off',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'danger',
        title: '批量删除'
      },
      {
        size: 'small',
        title: '上架'
      }
    ]
  },
  {
    label: '库存预警',
    name: 'min_stock',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'danger',
        title: '批量删除'
      }
    ]
  },
  {
    label: '回收站',
    name: 'delete',
    navFormColumn: [{
        type: 'input',
        label: '关键词',
        class: 'searchname',
        size: 'small',
        placeholder: '商品名称',
        prop: 'title'
      },
      {
        type: 'select',
        label: '商品分类',
        size: 'small',
        placeholder: '请选择商品分类',
        prop: 'category_id'
      }
    ],
    NavFormActions: [{
        size: 'small',
        type: 'primary',
        title: '新增'
      },
      {
        size: 'small',
        type: 'warning',
        title: '恢复商品'
      },
      {
        size: 'small',
        type: 'danger',
        title: '彻底删除'
      }
    ]
  }
]
