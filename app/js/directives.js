angular.module('directives', [])
    .directive('navigation', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/navigation.html'
        }
    })
    .directive('modal', function () {
         return {
           templateUrl : 'views/modal.html',
           restrict: 'E',
           transclude: true,
           replace:true,
           scope:true,
           link: function postLink(scope, element, attrs) {
             scope.title = attrs.title;
             scope.$watch(attrs.visible, function(value){
               if(value == true)
                 $(element).modal('show');
               else
                 $(element).modal('hide');
             });

             $(element).on('shown.bs.modal', function(){
               scope.$apply(function(){
                 scope.$parent[attrs.visible] = true;
               });
             });

             $(element).on('hidden.bs.modal', function(){
               scope.$apply(function(){
                 scope.$parent[attrs.visible] = false;
               });
             });
           }
         };
       })