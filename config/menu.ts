export default function menu() {
  return [
    // {
    //   name: 'department',
    //   display_name: 'Department',
    //   icon: 'ri-community-line',
    //   route: null,
    //   module: 'department',
    //   auth_level_min: 2,
    //   admin_required: true,
    //   caret: true,
    //   childs: [
    //     {
    //       name: 'department.index',
    //       display_name: 'Departments',
    //       icon: null,
    //       route: 'department.index',
    //       module: 'department.departments',
    //       auth_level_min: 3,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'department.map',
    //       display_name: 'Department Map',
    //       icon: null,
    //       route: 'department.map',
    //       module: 'department.department_map',
    //       auth_level_min: 3,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'department.positions',
    //       display_name: 'Positions',
    //       icon: null,
    //       route: null,
    //       module: 'department.positions',
    //       auth_level_min: 3,
    //       admin_required: false,
    //       caret: true,
    //       childs: [
    //         {
    //           name: 'department.positions',
    //           display_name: 'Positions',
    //           icon: null,
    //           route: 'department.position.index',
    //           module: 'department.positions',
    //           auth_level_min: 3,
    //           admin_required: false,
    //           caret: false
    //         },
    //         {
    //           name: 'department.positions-group',
    //           display_name: 'Position Groups',
    //           icon: null,
    //           route: 'department.position.group.index',
    //           module: 'department.positions',
    //           auth_level_min: 3,
    //           admin_required: false,
    //           caret: false
    //         }
    //       ]
    //     },
    //     {
    //       name: 'department.teams',
    //       display_name: 'Teams',
    //       icon: null,
    //       route: 'team.index',
    //       module: 'department.teams',
    //       auth_level_min: 3,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'department.offices',
    //       display_name: 'Offices',
    //       icon: null,
    //       route: 'department.office.index',
    //       module: 'department.offices',
    //       auth_level_min: 3,
    //       admin_required: false,
    //       caret: false
    //     }
    //   ]
    // },
    // {
    //   name: 'employee',
    //   display_name: 'Employee',
    //   icon: 'ri-user-2-line',
    //   route: null,
    //   module: 'employee',
    //   auth_level_min: 6,
    //   admin_required: false,
    //   caret: true,
    //   childs: [
    //     {
    //       name: 'employee.index',
    //       display_name: 'Employees',
    //       icon: null,
    //       route: 'employee.index',
    //       module: 'employee.employees',
    //       auth_level_min: 5,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'employee.contracts',
    //       display_name: 'Contracts',
    //       icon: null,
    //       route: 'employee.contract.index',
    //       module: 'employee.contracts',
    //       auth_level_min: 5,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'employee.promotions',
    //       display_name: 'Promotions/Mutations',
    //       icon: null,
    //       route: 'employee.promotion.index',
    //       module: 'employee.promotionsmutations',
    //       auth_level_min: 5,
    //       admin_required: false,
    //       caret: false
    //     },
    //     {
    //       name: 'employee.resign',
    //       display_name: 'Layoff/Resigns',
    //       icon: null,
    //       route: 'employee.resign.index',
    //       module: 'employee.layoffresigns',
    //       auth_level_min: 5,
    //       admin_required: false,
    //       caret: false
    //     }
    //   ]
    // },
    {
      name: 'user',
      display_name: 'User',
      icon: 'ri-account-circle-line',
      route: null,
      module: 'user',
      auth_level_min: 2,
      admin_required: true,
      caret: true,
      childs: [
        {
          name: 'user.index',
          display_name: 'User',
          icon: null,
          route: 'user',
          module: 'user.users',
          auth_level_min: 3,
          admin_required: false,
          caret: false
        },
        {
          name: 'user.logs',
          display_name: 'User Logs',
          icon: null,
          route: 'user',
          module: 'user.users',
          auth_level_min: 3,
          admin_required: false,
          caret: false
        }
      ]
    },
    // {
    //   type: 'system',
    //   name: 'settings',
    //   display_name: 'Settings',
    //   icon: 'ri-settings-5-line',
    //   route: 'settings',
    //   module: 'settings',
    //   auth_level_min: 1,
    //   admin_required: false,
    //   caret: false
    // }
  ]
}
