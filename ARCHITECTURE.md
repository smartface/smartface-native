Smartface Native Architecture consists of three major parts:

- Android&iOS Specific Classes
- Type Declarations&Interfaces
- EventEmitter usage

In order to provide Single Code Base within two different OS, we get which OS the current system is on and create distinct require relevant to that OS. For example, Hardware module is exported like this:

```
const Hardware: IHardware = require(`./hardware.${Device.deviceOS.toLowerCase()}`).default;
```

This makes the current module import to `hardware.ios.ts` or `hardware.android.ts`

A module can be one of two following:

- Singleton(One instance)
- Class(multiple instance)

# How to decide if a module should be singleton or class?

If your module mostly consists of static values which only consists of static getter/setter, that module should be singleton. An example to that would be Location.

However, if your module creates an instance of something and you want to have separate logic for every instance, that module should be class. An example to that would be FlexLayout.

> Make sure that the folder structure is relevant.
> E.g. if your element derives from View or ViewGroup, that should be located in ui/.
> Or if your module is relevant with device itself, that should be located in device/

# File Structure

yourModule

- yourModule.android.ts -> Main code of Android
- yourModule.iOS.ts -> Main code of Android
- yourModule.ts -> Main declarations of each property to be used. Have your OS specific value separated with iOS and Android
- index.ts -> Main file that separates imports for both OS

## yourModule.ts

All of the interface, class and event etc. definitions should be located here.

- This file should include every common typing there is to be used for your .android and .ios files. Let's take imageview for example. In order to specify the filltype, we have an enum value called `ImageFillType` and we have a property called `fillType` which is of type `ImageFillType`. Declaration of ImageFillType should be in this file.

```
import { ImageFillType } from '@smartface/native/ui/imageview/imageview';
import ImageView from '@smartface/native/ui/imageview';

const imageView = new ImageView();
imageView.fillType = ImageFillType.ASPECTFIT;
```

- This file will include the signature of the module. They will consist of:
- Interface(required): This interface will include all of the public methods and properties that will be visible to the user. Creating an interface is a must.
- Abstract Class(situational): Only create abstract class if you also need static methods or properties. Limitation is, interfaces can't contain static values.
- iOS&Android only properties(optional): This interface will include all of the .android and/or .ios properties that will be publicly visible to the user.

Also, you should have a clear definition of what your module requires. Make sure you have a clear answer to these questions:
[] Do my module need iOS&Android only properties that will be accessible by `yourModule.android.yourProperty`
[] Do my module need `nativeObject` property which consists of the native representation of the module. For example on iOS, View would be `UIView` which is a UIKit class on iOS native.
[] Do my module need static properties that needs to be directly added to the module import. (Remember that if all properties or methods are like that, use singleton)
[] Do my module need to have EventEmitter (on, once, etc.)
[] Do my module extend from some other class?

### Construct a module with EventEmitter

Simply extend from IEventEmitter on your interface. It takes one generic argument that specifies your event names. It is better to include that as generic of your own module so that if anybody else needs to extend it, they can have an easier time doing it.

```
import { YourModuleEvents } from './yourModule-events';
export interface IYourModule<TEvent extends string = YourModuleEvents> extends IEventEmitter<TEvent> {

}
```

If you are _sure_ that your module will not be a parent of any other module, you can simply do:

```
import { YourModuleEvents } from './yourModule-events';
export interface IYourModule extends IEventEmitter<YourModuleEvents> {

}
```

### Construct a module with NativeObject

If your module is going to use nativeObject(most of the modules have this), you should extend from INativeComponent. It takes generic arguments of what the type of nativeObject should be, but if you are not sure about that, you can simply pass any or nothing.

```
export interface IYourModule extends INativeComponent {

}

```

> You can extend from more than one interfaces on interfaces by separating them with comma.

### Construct a module with both EventEmitter and NativeObject

Simply extend from both interfaces like this:

```
import { YourModuleEvents } from './yourModule-events';
export interface IYourModule<TEvent extends string = YourModuleEvents> extends IEventEmitter<TEvent>, INativeComponent {

}
```

### Construct a module with Android and iOS properties

This is where you will use your Android and iOS only interfaces. We have `INativeMobileComponent` interface that enables you to easily type Android or iOS only properties.

```
interface YourModuleIOSProps {

}

interface YourModuleAndroidProps {

}

export interface IYourModule<TNative extends any = any> extends INativeMobileComponent<TNative, MobileOSProps<YourModuleIOSProps, YourModuleAndroidProps>>
```

> If you only have one of Android or iOS only values, you can simply pass empty object or any on generic arguments.

### Construct an Abstract Class

As it is mentioned above, if you have static values, you should use Abstract classes which implements the interface you have created.

```
export class AbstractYourModule extends NativeMobileComponent<any, MobileOSProps<YourModuleIOSProps, YourModuleAndroidProps>> implements IYourModule {
  abstract static yourMethod() {
    throw new Error('Method not implemented'); //This will be implemented on .ios and .android
  };
}
```

With EventEmitter:

```
export class AbstractYourModule<TEvent extends string = YourModuleEvents> extends NativeEventEmitterComponent<TEvent, any, MobileOSProps<YourModuleIOSProps, YourModuleAndroidProps>> implements IYourModule {

}
```

## yourModule.\*.ts

Now the place which will have the real code. If your module extends from somewhere else, that should be inheriting from OS specific code of that module.

For example on Android:

```
export default class YourModuleAndroid<TEvent extends string = YourModulevents, TNative = any, TProps extends IYourModule = IYourModule>
  extends ViewAndroid<TEvent | YourModuleEvents, TNative, TProps>
  implements IYourModule {
  constructor(params?: TProps) {
    super(params);
  }
}
```

If your module is singleton:

```
export default class YourModuleAndroidClass implements IYourModule {

}

const YourModuleAndroid = new YourModuleAndroidClass();

export default YourModuleAndroid;

```

### With Eventemitter and/or NativeObject

All of the nativeObject or EventEmitter interfaces also have classes which you should be using if your module depends on them.

There are also pre-defined abstract methods which is used in the life-cycle of the modules.

### createNativeObject

This abstract method is responsible to create the native object. It should return nativeObject value of our module.

> This method called before the constructor of the module.

### preConstructor

As the name implies, this is invoked before constructor. It is used to set the default properties of the module. Before ESNext(ES7-), Assinging class member properties directly causes them to be applied on constructor, which might result with unintended behaviors since some parameters are needed to be set before constructor.

### addIOSProps&addAndroidProps

Those methods are used to add iOS and Android specific properties to the module. It is recommended to have another function that returns the object for iOS&Android specific properties.

## yourModule-events.ts

If your module has any event, you should have a file named `yourModule-events.ts` which will contain the event definitions.

```
import { ViewEvents } from '../view/view-events';

export const YourModuleEvents = {
  ...ViewEvents, // If it extends from some other class
  /**
   * Event emitted when the switch is changed.
   */
  ToggleChanged: 'toggleChanged'
} as const;

export type YourViewEvents = ExtractValues<typeof YourViewEvents>;
```

## index.ts

The main block that separates iOS&Android code should be here. There are two forms of exports:

- The modules with only an interface
- The modules with abstract class
- Singleton modules

Since we have to mimic the class itself, we will convert our interface into a class or inherit something from abstract class.

### Interface

The idea is to convert the interface into a constructor, which renders it to be usable by new keyword.

```
import { IYourModule } from './yourModule';

const YourModule: ConstructorOf<IYourModule, Partial<IYourModule>> = require(`./yourmodule.${Device.deviceOS.toLowerCase()}`).default;
type YourModule = IYourModule;

export default YourModule;

```

### Abstract Class

We just have to create a class that extends the abstract class. Remember, this class will not be used by the users.

```

import { AbstractYourModule } from './yourmodule';

class YourModuleBase extends AbstractYourModule {

}

const YourModule: typeof YourModuleBase = require(`./yourmodule.${Device.deviceOS.toLowerCase()}`).default;
type YourModule = YourModuleBase;

export default YourModule;

```

### Singleton

Since we are just having a single instance, just declare the interface as type and be done with it.

```
import { IYourModule } from './yourmodule';

const YourModule: IYourModule = require(`./yourmodule.${Device.deviceOS.toLowerCase()}`).default;
type YourModule = IYourModule;

export YourModule;

```
